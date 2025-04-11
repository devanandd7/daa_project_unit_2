import Navbar from "./navbar";

const VideoPage = () => {
   
    return (
        <>
        <Navbar />
        <div className="p-6 sm:p-8 flex justify-center items-center">
            <iframe
                src="https://aivideochat.vercel.app/youtube"
                width="100%"  // Adjust as needed
                height="600" // Adjust as needed
                style={{ border: 'none' }}
                allowFullScreen
                title="0/1 Knapsack Video Explanation"
                className="rounded-xl shadow-2xl"
            />
        </div>
        </>
    );
};
export default VideoPage;