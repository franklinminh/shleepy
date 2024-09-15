import { get } from "../../utilities.js";

export async function requestSong(prompt) {
    return new Promise((resolve, reject) => {
        get("/api/requestSong", {
            topic: prompt.topic,
            tags: prompt.tags
        })
        .then((res) => {
            const songId = res.id;
            const pollForSong = async () => {
                try {
                  while (true) {
                    const songRes = await get("/api/getSong", { id: songId });
                    console.log("GET SONG for prompt", prompt);
    
                    // Resolve the promise when the song status is "complete"
                    if (songRes[0].status === "complete") {
                      console.log("Song complete:", songRes[0].audio_url);
                      resolve(songRes[0].audio_url); // Resolve the promise with the song URL
                      break; // finish!
                    }
    
                    // Reject the promise if there's an error
                    if (songRes[0].status === "error") {
                        // baseline url
                      resolve("https://cdn1.suno.ai/41d8c64e-c1a9-49c9-aa66-5ab68912abc0.mp3")
                      break; // finish!
                    }
    
                    // Wait for 30 seconds before checking again
                    await new Promise((resolve) => setTimeout(resolve, 30000));
                  }
                } catch (error) {
                  reject(error);
                }
              }; 
              
            pollForSong();
        });
    });
}
