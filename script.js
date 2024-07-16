
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
    fetchRandomImages('memes', 8);

    document.addEventListener("DOMContentLoaded", function() {
        const ctx = document.getElementById('skillsChart').getContext('2d');
        const skillsData = {
            labels: ['Python', 'PHP', 'JavaScript', "Rust",'C#', 'C/C++', 'HTML', 'CSS', 'SQL', 'Database Adminstration','Git'],
            datasets: [{
                label: 'Skill Level',
                data: [5, 4.5, 4,2, 3, 2, 4.5, 3, 4, 4,3],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.4)',
                    'rgba(75, 192, 100, 0.4)',
                    'rgba(175, 16, 192, 0.4)',
                    'rgba(153, 102, 255, 0.4)',
                    'rgba(255, 159, 64, 0.4)',
                    'rgba(275, 255, 2, 0.4)',
                    'rgba(255, 25, 25, 0.4)',
                    'rgba(75, 252, 75, 0.4)',
                    'rgba(180, 192, 190, 0.4)',
                    'rgba(15, 16, 190, 0.4)',
                    'rgba(193, 192, 5, 0.4)',
    
                    
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(75, 192, 100, 1)',
                    'rgba(175, 16, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(275, 255, 2, 1)',
                    'rgba(255, 25, 25, 1)',

                ],
                borderWidth: 1
            }]
        };
    
       
        const config = {
            type: 'bar',
            data: skillsData,
            options: {
                plugins: {
                    legend: {
                        display: false  // Hide the legend
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 5,
                        display: false  // Hide y-axis numbers
                    }
                },
                
            }
        };

    
        const skillsChart = new Chart(ctx, config);
    });
    