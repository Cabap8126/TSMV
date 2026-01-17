// uploadimg
const uploadImage = document.querySelector("[upload-image]")
if (uploadImage) {
    const uploadImageInput = uploadImage.querySelector("[upload-image-input]");
    const uploadImagePreview = uploadImage.querySelector("[upload-image-preview]")
    const buttonX = uploadImage.querySelector("[clickX]")
    uploadImageInput.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (file) {
            // buttonX.classList.add("mb-2003");
            uploadImagePreview.src = URL.createObjectURL(file);
        }
    })
    // buttonX.addEventListener("click", () => {
    //     uploadImagePreview.src = ""
    //     uploadImageInput.value = ""
    //     buttonX.classList.remove("mb-2003")
    // })
}
// end
//upload audio
const uploadAudio = document.querySelector("[upload-audio]")
if(uploadAudio){
    const uploadAudioInput = uploadAudio.querySelector("[upload-audio-input]")
    const uploadAudioPlay = uploadAudio.querySelector("[upload-audio-play]")
    const source = uploadAudioPlay.querySelector("source")
    uploadAudioInput.addEventListener("change",(e)=>{
        if(e.target.files.length){
            const audio = URL.createObjectURL(e.target.files[0])
            source.src=audio;
            uploadAudioPlay.load();
        }
    })
}
// end