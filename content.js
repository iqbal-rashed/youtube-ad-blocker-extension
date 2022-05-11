window.onload = () => {
    const targetNode = document.getElementById("movie_player") || document.body;
    selfObserver(targetNode);
};

function selfObserver(documentNode) {
    const observer = new MutationObserver(function (mutationList) {
        for (let i = 0; i < mutationList.length; i++) {
            const element = mutationList[i];
            if (element.type === "childList") {
                if (
                    element.target.attributes &&
                    element.target.attributes.class &&
                    element.target.attributes.class.value ===
                        "video-ads ytp-ad-module"
                ) {
                    adFunction();
                }
            }
        }
    });

    const config = {
        subtree: true,
        childList: true,
    };

    // Start observing
    observer.observe(documentNode, config);
}

function adFunction() {
    const mainDocument = document.getElementsByClassName(
        "video-ads ytp-ad-module"
    );
    const playerOverlay = document.getElementsByClassName(
        "ytp-ad-player-overlay"
    );
    const imageOverlay = document.getElementsByClassName(
        "ytp-ad-image-overlay"
    );

    const skipBtn = document.getElementsByClassName(
        "ytp-ad-skip-button ytp-button"
    );

    const videoDocument = document.getElementsByClassName(
        "video-stream html5-main-video"
    );

    function handleSkipBtn() {
        if (skipBtn.length > 0) {
            skipBtn[0].click();
        }
    }

    if (mainDocument.length > 0) {
        handleSkipBtn();
        if (playerOverlay.length > 0) {
            playerOverlay[0].style.visibility = "hidden";
            for (let i = 0; i < videoDocument.length; i++) {
                if (videoDocument[i] && videoDocument[i].duration) {
                    videoDocument[i].currentTime = videoDocument[i].duration;
                }
            }
            handleSkipBtn();
            console.log("Video Ad Blocked!!!");
        }
        if (imageOverlay.length > 0) {
            imageOverlay[0].style.visibility = "hidden";
            console.log("Image Ad blocked!!!");
        }
    }
}
