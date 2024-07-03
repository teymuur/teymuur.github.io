
installbtn =  document.getElementById("install")
codevisible = false
   installbtn.addEventListener('click', function(event) {
    if(!codevisible){
        event.preventDefault();
        
        document.getElementById("code").style = "display: default";
        codevisible = true;
    }else{
        document.getElementById("code").style = "display: none";
        codevisible = false;
    }

    });

    function copytoclipboard() {
        // Get the text field
        var copyText = document.getElementById("code");
      
        // Select the text field
        copyText.select();
        copyText.setSelectionRange(0, 99999); // For mobile devices
      
         // Copy the text inside the text field
        navigator.clipboard.writeText(copyText.value);
      
        // Alert the copied text
        alert("Copied the text: " + copyText.value);
      }

      // Fetch random memes from reddit
      async function fetchRandomImages(subreddit, numImages = 5) {
        try {
            const response = await fetch(`https://www.reddit.com/r/${subreddit}/hot.json?limit=100`);
            const data = await response.json();
            const posts = data.data.children;
            
            // Filter image posts
            const imagePosts = posts.filter(post => {
                const url = post.data.url;
                return url.endsWith('.jpg') || url.endsWith('.jpeg') || url.endsWith('.png') || url.endsWith('.gif');
            });

            // Get random images
            const randomImages = [];
            for (let i = 0; i < numImages && imagePosts.length > 0; i++) {
                const randomIndex = Math.floor(Math.random() * imagePosts.length);
                randomImages.push(imagePosts.splice(randomIndex, 1)[0].data);
            }

            displayImages(randomImages);
        } catch (error) {
            console.error('Error fetching images:', error);
        }
    }

    function displayImages(images) {
        const imagesDiv = document.getElementById('images');
        imagesDiv.innerHTML = '';
        images.forEach(image => {
            const galleryDiv = document.createElement('div');
            galleryDiv.className = 'gallery';

            const link = document.createElement('a');
            link.href = image.url;
            link.target = '_blank';

            const img = document.createElement('img');
            img.src = image.url;
            img.alt = image.title;
            img.width = 600;
            img.height = 400;

            const desc = document.createElement('div');
            desc.className = 'desc';
            desc.textContent = image.title;

            link.appendChild(img);
            galleryDiv.appendChild(link);
            galleryDiv.appendChild(desc);
            imagesDiv.appendChild(galleryDiv);
        });
    }

    // Fetch and display random images from the 'EarthPorn' subreddit
    fetchRandomImages('memes', 10);
