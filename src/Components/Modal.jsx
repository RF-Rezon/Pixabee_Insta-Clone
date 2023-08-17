"use client";
import { Dialog, Transition } from "@headlessui/react";
import { addDoc, collection, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { useSession } from "next-auth/react";
import { Fragment, useRef, useState } from "react";
import { HiOutlineCamera } from "react-icons/hi";
import { useRecoilState } from "recoil";
import { db, storage } from "../../firebase";
import { modalState } from "../app/atoms/modalAtom";

const Modal = () => {
  const [open, setOpen] = useRecoilState(modalState);
  const filePickerRef = useRef(null);
  const captionRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const session = useSession();

  const uploadPost = async () => {
    if (loading) return;

    setLoading(true);

    // 1) Create a post and add to firebase "posts" collections
    // 2) Get the post ID for the newly created post
    // 3) Upload the image to firebase storage with the post ID
    // 4) Get a download URL from firebase storage and update the original post with image

    // 1) Create a New Post:
    const docRef = await addDoc(collection(db, "posts"), {
      username: session?.data?.user?.name,
      caption: captionRef?.current?.value,
      profileImg: session?.data?.user?.image,
      timestamp: serverTimestamp(),
    });

    // 2) Get the New Post's ID:
    console.log("New doc added with ID", docRef.id);

    // 3) Upload an Image for the Post:
    const imageRef = ref(storage, `posts/${docRef.id}/image`);

    // 4) Upload the Image:
    await uploadString(imageRef, selectedFile, "data_url").then(async (snapshot) => {
      const downloadURL = await getDownloadURL(imageRef);
      
  
      //  The updateDoc function expects the following parameters: updateDoc(db, 'collectionPath', docId, newData).
      // 5) Update the post with the Image:

      await updateDoc(doc(db, "posts", docRef.id), {
        // Corrected: Added the data to update as an object
        image: downloadURL
      });
    });


    // 6) Wrap Up:
    
    setOpen(false);
    setLoading(false);
    setSelectedFile(null);
  };

  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={setOpen}>
        <div className="flex items-end justify-center min-h-[800px] sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100  translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0  sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
              <div>
                {selectedFile ? (
                  <img
                    src={selectedFile}
                    className="w-full object-contain cursor-pointer"
                    onClick={() => setSelectedFile(null)}
                    alt=""
                  />
                ) : (
                  <div
                    onClick={() => filePickerRef.current.click()}
                    className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 cursor-pointer"
                  >
                    <HiOutlineCamera className="h-6 w-6 text-blue-500" aria-hidden="true" />
                  </div>
                )}

                <div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                      Upload a photo
                    </Dialog.Title>
                    <div>
                      <input type="file" ref={filePickerRef} hidden onChange={addImageToPost} />
                    </div>
                    <div className="mt-2">
                      <input
                        type="text"
                        className="border-none focus:ring-0 w-full text-center py-3 mt-3"
                        ref={captionRef}
                        placeholder="Please enter a caption...."
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-5 sm:mt-6">
                  <button
                    type="button"
                    disabled={!selectedFile}
                    className="inline-flex justify-center w-full rounded-md border-transparent shadow-sm px-4 focus:ring-offset-2 py-2 bg-blue-400 text-base font-medium text-white hover:bg-blue-500 sm:text-sm disabled:bg-gray-300 focus:outline-none disabled:cursor-not-allowed hover:disabled:bg-gray-300"
                    onClick={uploadPost}
                  >
                    {loading ? "Uploading..." : "Upload Post"}
                  </button>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Modal;
