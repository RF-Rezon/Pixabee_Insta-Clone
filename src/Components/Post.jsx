import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import {
  HiBookmark,
  HiOutlineBookmark,
  HiOutlineChatAlt2,
  HiOutlineDotsCircleHorizontal,
  HiOutlineEmojiHappy,
  HiOutlinePaperAirplane,
  HiOutlineThumbUp,
  HiThumbUp,
} from "react-icons/hi";
import Moment from "react-moment";
import { db } from "../../firebase";

const Post = ({ id, username, userImg, postImg, caption }) => {
  // This all users information.
  const session = useSession();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [likes, setLikes] = useState([]);
  const [hasliked, hassetLiked] = useState(false);
  const [bookmark, setBookmark] = useState([]);
  const [hasbookmarked, sethasbookmarked] = useState(false);
  const inputRef = useRef(null);

  // Comment functionality ..................................................

  const sendComment = async (e) => {
    e.preventDefault();
    const commentToSend = comment;
    setComment("");

    await addDoc(collection(db, "posts", id, "comments"), {
      comment: commentToSend,
      username: session.data.user.name,
      userImage: session.data.user.image,
      timestamp: serverTimestamp(),
    });
  };

  // >>>>>>>>>>>>>>>>>> Real time. Don't need to reload the page again.
  useEffect(() => {
    onSnapshot(query(collection(db, "posts", id, "comments"), orderBy("timestamp", "desc")), (snapshot) => {
      const postDataComment = snapshot.docs.map((doc) => ({
        id: doc.id, // Include the document ID
        ...doc.data(), // Include the document data // SNAPSHOT IS DIFFERENT FROM FIREBASE V9
      }));
      setComments(postDataComment);
    });
  }, [db]);

  // Like functionality ..................................................................................

  useEffect(() => {
    onSnapshot(collection(db, "posts", id, "likes"), (snapshot) => {
      const LikedDocument = snapshot.docs.map((doc) => ({
        id: doc.id, // Include the document ID
        ...doc.data(), // Include the document data // SNAPSHOT IS DIFFERENT FROM FIREBASE V9
      }));
      setLikes(LikedDocument);
    });
  }, [db]);

  useEffect(() => hassetLiked(likes.findIndex((like) => like.id === id) !== -1), [likes]); // Don't understand.

  const likePost = async () => {
    if (hasliked) {
      await deleteDoc(doc(db, "posts", id, "likes", id)); // 1st id = post id. 2nd id = user id.
    } else {
      await setDoc(doc(db, "posts", id, "likes", id), {
        // 1st id = post id. 2nd id = user id.
        username: session?.data?.user?.name,
      });
    }
  };

  // Bookmark functionality ..................................................................................

  useEffect(() => {
    onSnapshot(collection(db, "posts", id, "bookmarked"), (snapshot) => {
      const BookMarkedDocument = snapshot.docs.map((doc) => ({
        id: doc.id, // Include the document ID
        ...doc.data(), // Include the document data // SNAPSHOT IS DIFFERENT FROM FIREBASE V9
      }));
      setBookmark(BookMarkedDocument);
    });
  }, [db]);

  useEffect(() => sethasbookmarked(bookmark.findIndex((like) => like.id === id) !== -1), [bookmark]); // Don't understand.

  const bookmarkPost = async () => {
    if (hasbookmarked) {
      await deleteDoc(doc(db, "posts", id, "bookmarked", id)); // 1st id = post id. 2nd id = user id.
    } else {
      await setDoc(doc(db, "posts", id, "bookmarked", id), {
        // 1st id = post id. 2nd id = user id.
        username: session?.data?.user?.name,
      });
    }
  };

  // Comment Indicator
  const handleCommentIconClick = () => {
    setIsInputFocused(true);
    setTimeout(() => {
      setIsInputFocused(false);
    }, 2000);
  };

  return (
    <div className="bg-white my-7 border rounded-lg">
      {/* Header  */}
      <div className="flex items-center p-5">
        <img src={userImg} className="rounded-full h-12 w-12 object-cover border p-1 mr-3" alt="" />
        <p className="flex-1 font-bold">{username}</p>
        <HiOutlineDotsCircleHorizontal className="h-5" />
      </div>

      {/* img  */}
      <img className="object-cover w-full" src={postImg} alt="" />

      {/* Buttons  */}
      {session.status === "authenticated" && (
        <div className="flex justify-between px-4 pt-4">
          <div className="flex space-x-4">
            {hasliked ? (
              <HiThumbUp className="btn text-blue-400" onClick={likePost} />
            ) : (
              <HiOutlineThumbUp className="btn" onClick={likePost} />
            )}
            <HiOutlineChatAlt2 className="btn" onClick={handleCommentIconClick} />
            <HiOutlinePaperAirplane className="btn" />
          </div>
          {hasbookmarked ? (
            <HiBookmark onClick={bookmarkPost} className="btn text-yellow-400" />
          ) : (
            <HiOutlineBookmark onClick={bookmarkPost} className="btn" />
          )}
        </div>
      )}

      {/* Caption  */}
      <div>
        {likes.length > 0 && (
          <p className="font-bold mt-3 mb-1 ml-4">
            {likes?.length} {likes?.length > 1 ? <span>likes</span> : <span>like</span>}
          </p>
        )}

        <p className="p-5 truncate">
          <span className="font-bold mr-2">{username}</span>
          {caption}
        </p>
      </div>

      {/* Comments */}

      {comments.length > 0 && (
        <div className="ml-9 h-20 overflow-y-scroll scrollbar-thumb-black scrollbar-thin">
          {comments.map((comment) => (
            <div key={comment.id} className="flex items-center space-x-3 mb-3">
              <img className="h-7 rounded-full" src={comment.userImage} alt="" />
              <p className="text-sm flex-1 ">
                <span className="font-bold mr-2">{comment.username}</span>
                {comment.comment}
              </p>
              <Moment fromNow interval={1000} className="pr-8 text-xs text-gray-700">
                {comment.timestamp?.toDate()}
              </Moment>
            </div>
          ))}
        </div>
      )}

      {/* input box  */}

      {session.status === "authenticated" && (
        <form className="flex items-center p-4">
          <HiOutlineEmojiHappy className="h-5 w-5 mr-2" />
          <input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            type="text"
            placeholder="Add a comment ..."
            className={`rounded-lg px-3 flex-1 ${
              isInputFocused
                ? "border-2 border-blue-300 ring-2 transition-all ease-in"
                : "border-none transition-all ease-out"
            } outline-none`}
          />
          <button
            type="submit"
            disabled={!comment.trim()}
            onClick={sendComment}
            className="font-semibold text-blue-400 ml-3"
          >
            Post
          </button>
        </form>
      )}
    </div>
  );
};

export default Post;
