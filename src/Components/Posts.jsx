import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import Post from "./Post";
const Posts = () => {
  

  const [posts, setPosts] = useState([]);

  // >>>>>>>>>>>>>>>>>> Real time. Don't need to reload the page again.

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "posts"), orderBy("timestamp", "desc")),
      (snapshot) => {
        const postData = snapshot.docs.map((doc) => ({
          id: doc.id, // Include the document ID
          ...doc.data(), // Include the document data  // SNAPSHOT IS DIFFERENT FROM FIREBASE V9
        }));
        setPosts(postData);
        console.log(postData)
      }
    );

    return () => unsubscribe();
  }, [db]);


    // >>>>>>>>>>>>>>>>>> Not real time. Need to reload the page again.

  // useEffect(() => {
  //   let getAlldataFunc = async () =>{
  //     try{
  //       const querySnapshot = await getDocs(collection(db, "posts"), orderBy("timestamp", "desc"));

  //     const dataArray = [];

  //     querySnapshot.forEach(doc => {
  //       const data = {
  //         id: doc.id,
  //         ...doc.data(),
  //       };

  //       dataArray.push(data);
  //       setPosts(dataArray)
  //     });
  //     }catch(err){
  //       console.error("error happened")
  //     }
  //   } 
  
  //   getAlldataFunc();
  //   }, [db])
  

  return (
    <div>
     {
      posts.map((post)=> (
        <Post
        key={post.id}
        id={post.id}
        caption={post.caption}
        username={post.username}
        userImg={post.profileImg}
        postImg={post.image}
      />
      ))
     }
    </div>
  );
};

export default Posts;
