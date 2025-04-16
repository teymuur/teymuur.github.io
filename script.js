
    function truncateString(str, maxLength = 40) {
        if (str.length <= maxLength) {
            return str;
        }
        return str.slice(0, maxLength - 3) + '...';
    }
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
            img.alt = truncateString(image.title); 
            img.width = 600;
            img.height = 400;

            const desc = document.createElement('div');
            desc.className = 'desc';
            desc.textContent = truncateString(image.title);

            link.appendChild(img);
            galleryDiv.appendChild(link);
            galleryDiv.appendChild(desc);
            imagesDiv.appendChild(galleryDiv);
        });
    }

    // Fetch and display random images from the 'EarthPorn' subreddit
    fetchRandomImages('programmerhumor', 9);

    

//TypeScript
const roles = [' Web Developer', ' Student', ' Graphic Designer', ' Programmer','n Entrepreneur'];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 100;
const deletingSpeed = 50;
const pauseBetweenRoles = 1000;

function typeWriter() {
    const currentRole = roles[roleIndex];
    const typewriterElement = document.getElementById('typewriter');

    if (isDeleting) {
        typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        setTimeout(typeWriter, pauseBetweenRoles);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(typeWriter, typingSpeed);
    } else {
        setTimeout(typeWriter, isDeleting ? deletingSpeed : typingSpeed);
    }
}

typeWriter();

document.addEventListener('DOMContentLoaded', () => {
    const skillsSection = document.getElementById('skills');
    const skillIcons = document.querySelectorAll('.skill-icon');
    
    // Set up Intersection Observer for the skills section
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // When skills section comes into view, animate icons in
                skillIcons.forEach(icon => {
                    icon.classList.add('visible');
                });
            } else {
                // When skills section goes out of view, animate icons out
                skillIcons.forEach(icon => {
                    icon.classList.remove('visible');
                });
            }
        });
    }, { threshold: 0.2 }); 
    
    skillsObserver.observe(skillsSection);
    
    // Smooth scrolling for navigation
    document.querySelectorAll('nav a.scroll').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop,
                behavior: 'smooth'
            });
        });
    });
});