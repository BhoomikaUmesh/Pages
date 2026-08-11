
import { useEffect, useState } from "react";

const API_URL =
  "https://pages-backend-9jsz.onrender.com/api/comments/";

function Home() {
  const [comments, setComments] = useState([]);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Get comments from Django when the page loads
  useEffect(() => {
    fetch(API_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch comments");
        }

        return response.json();
      })
      .then((data) => {
        console.log("Comments received:", data);
        setComments(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("GET error:", error);
        setError("Could not load comments.");
        setLoading(false);
      });
  }, []);

  // Submit a new comment
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!name.trim() || !comment.trim()) {
      setError("Please enter your name and comment.");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          comment: comment.trim(),
        }),
      });

      const newComment = await response.json();

      console.log("POST response:", response.status, newComment);

      if (!response.ok) {
        throw new Error(JSON.stringify(newComment));
      }

      // Add the new comment to the list immediately
      setComments((currentComments) => [
        ...currentComments,
        newComment,
      ]);

      // Clear the form
      setName("");
      setComment("");
    } catch (error) {
      console.error("POST error:", error);
      setError("Could not submit your comment.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h1>Home Page</h1>

      <p>Welcome to my website.</p>

      <hr />

      <h2>Leave a comment</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <br />

          <input
            id="name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Your name"
          />
        </div>

        <br />

        <div>
          <label htmlFor="comment">Comment</label>
          <br />

          <textarea
            id="comment"
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            placeholder="Write a comment"
            rows="4"
          />
        </div>

        <br />

        <button type="submit" disabled={submitting}>
          {submitting ? "Submitting..." : "Submit Comment"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <hr />

      <h2>Comments</h2>

      {loading ? (
        <p>Loading comments...</p>
      ) : comments.length === 0 ? (
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

      <footer>© 2026 Bhoomika Umesh</footer>
    </div>
  );
}

export default Home;

