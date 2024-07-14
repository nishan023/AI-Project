const Hero = () => {
  return (
    <>
      <div className="relative w-full h-[93vh]">
        <div className=" absolute inset-0 bg-[url('./assets/HomePage/code-binary-code-glow-pattern-5931cubdmyebx3h5.jpg')] z-10"></div>

        <div className=" bg-gradient-to-t from-blue-900/75  to-red-500/0  p-64 z-20 absolute inset-0 ">
          <p className="text-center text-[100px] bg-gradient-to-r from-red-400 via-purple-500 to-indigo-700 text-transparent bg-clip-text">
            &lt;Code/&gt;
          </p>
          <p className="text-center text-white">
            Some corny ahh coding lines here
          </p>
        </div>
      </div>
    </>
  );
};

export default Hero;
