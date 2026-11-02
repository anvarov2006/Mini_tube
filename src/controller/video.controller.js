
import { query } from "../db.js";
import { sendCommentEmail } from "../utils/mailer.js";

// 1. Barcha videolarni olish
export async function getVideos(req, res) {
  try {
    const result = await query(
      `SELECT id, user_id, title, description, video_url, views, created_at
       FROM videos
       ORDER BY id DESC`
    );

    return res.status(200).json({
      message: "Videolar ro'yxati",
      videos: result.rows,
    });
  } catch (error) {
    console.error("Get videos xatosi:", error.message);

    return res.status(500).json({
      message: "Serverda xatolik",
    });
  }
}

// 2. Bitta videoni olish va views oshirish
export async function getVideoById(req, res) {
  try {
    const { id } = req.params;

    if (!/^[1-9]\d*$/.test(id)) {
      return res.status(404).json({
        message: "Video topilmadi",
      });
    }

    const result = await query(
      `UPDATE videos
       SET views = views + 1
       WHERE id = $1
       RETURNING *`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Video topilmadi",
      });
    }

    return res.status(200).json({
      message: "Video topildi",
      video: result.rows[0],
    });
  } catch (error) {
    console.error("Get video xatosi:", error.message);

    return res.status(500).json({
      message: "Serverda xatolik",
    });
  }
}

// 3. Yangi video qo'shish
export async function createVideo(req, res) {
  try {
    const { title, description, videoUrl } = req.body;

    const result = await query(
      `INSERT INTO videos (user_id, title, description, video_url)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [
        req.user.id,
        title,
        description || null,
        videoUrl,
      ]
    );

    return res.status(201).json({
      message: "Video qo'shildi",
      video: result.rows[0],
    });
  } catch (error) {
    console.error("Create video xatosi:", error.message);

    return res.status(500).json({
      message: "Serverda xatolik",
    });
  }
}


export async function getComments(req, res) {
  try {
    const { id } = req.params;

    if (!/^[1-9]\d*$/.test(id)) {
      return res.status(404).json({
        message: "Video topilmadi",
      });
    }

    const video = await query(
      "SELECT id FROM videos WHERE id = $1",
      [id]
    );

    if (video.rows.length === 0) {
      return res.status(404).json({
        message: "Video topilmadi",
      });
    }

    const result = await query(
      `SELECT
        comments.id,
        comments.video_id,
        comments.user_id,
        comments.text,
        comments.created_at,
        users.name AS user_name
       FROM comments
       JOIN users ON comments.user_id = users.id
       WHERE comments.video_id = $1
       ORDER BY comments.created_at DESC`,
      [id]
    );

    return res.status(200).json({
      message: "Izohlar ro'yxati",
      comments: result.rows,
    });
  } catch (error) {
    console.error("Get comments xatosi:", error.message);

    return res.status(500).json({
      message: "Serverda xatolik",
    });
  }
}


export async function createComment(req, res) {
  try {
    const { id } = req.params;
    const { text } = req.body;

    if (!/^[1-9]\d*$/.test(id)) {
      return res.status(404).json({
        message: "Video topilmadi",
      });
    }

    // Videoni va uning muallifini tekshirish
    const videoResult = await query(
      `SELECT
        videos.id,
        videos.title,
        videos.user_id,
        users.name AS author_name,
        users.email AS author_email
       FROM videos
       JOIN users ON videos.user_id = users.id
       WHERE videos.id = $1`,
      [id]
    );

    if (videoResult.rows.length === 0) {
      return res.status(404).json({
        message: "Video topilmadi",
      });
    }

    const video = videoResult.rows[0];

    // Izohni bazaga saqlash
    const commentResult = await query(
      `INSERT INTO comments (video_id, user_id, text)
       VALUES ($1, $2, $3)
       RETURNING id, video_id, user_id, text, created_at`,
      [id, req.user.id, text]
    );

    const comment = commentResult.rows[0];

    // Foydalanuvchi o'z videosiga izoh yozsa email yuborilmaydi
    if (Number(video.user_id) !== Number(req.user.id)) {
      try {
        const commenterResult = await query(
          "SELECT name FROM users WHERE id = $1",
          [req.user.id]
        );

        const commenterName = commenterResult.rows[0]?.name || "Foydalanuvchi";

        await sendCommentEmail(
          video.author_email,
          video.author_name,
          commenterName,
          video.title,
          comment.text
        );
      } catch (emailError) {
        console.error("Comment email yuborilmadi:", emailError.message);
      }
    }

    return res.status(201).json({
      message: "Izoh qo'shildi",
      comment,
    });
  } catch (error) {
    console.error("Create comment xatosi:", error.message);

    return res.status(500).json({
      message: "Serverda xatolik",
    });
  }
}
