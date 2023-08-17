
const Story = ({ img, name }) => {
  return (
    <div className="flex flex-col items-center">
      <img className="h-10 w-10 rounded-full p-[1.5px] border border-2 border-blue-400 object-contain cursor-pointer hover:scale-110 transition transform duration-200 ease-out" src={img}/>

    <p className="text-xs w-14 truncate text-center">{name}</p>
    </div>
  );
};

export default Story;
