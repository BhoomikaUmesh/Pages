import { useEffect, useState } from "react";

const API_URL = "http://127.0.0.1:8000/api/comments/";

function Home() {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  // Get existing comments from Django
  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        setComments(data);
      })
      .catch((error) => {
        console.error("Error loading comments:", error);
      });
  }, []);

  // Send a new comment to Django
  async function handleSubmit(event) {
    event.preventDefault();

    if (!name.trim() || !comment.trim()) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          comment: comment,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create comment");
      }

      const newComment = await response.json();

      setComments((currentComments) => [
        newComment,
        ...currentComments,
      ]);

      setName("");
      setComment("");
    } catch (error) {
      console.error("Error creating comment:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1>Home Page</h1>

      <p>Welcome to my website.</p>

      <hr />

      <h2>Leave a comment</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Name:
            <br />
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Your name"
            />
          </label>
        </div>

        <br />

        <div>
          <label>
            Comment:
            <br />
            <textarea
              value={comment}
              onChange={(event) => setComment(event.target.value)}
              placeholder="Your comment"
              rows="4"
              cols="40"
            />
          </label>
        </div>

        <br />

        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>

      <hr />

      <h2>Comments</h2>

      {comments.length === 0 ? (
        <p>No comments yet.</p>
      ) : (
        comments.map((item) => (
          <div key={item.id}>
            <strong>{item.name}</strong>
            <p>{item.comment}</p>
            <small>{item.created_at}</small>
            <hr />
          </div>
        ))
      )}
    </div>
  );
}

export default Home;