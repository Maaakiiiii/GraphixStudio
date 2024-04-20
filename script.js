    document.addEventListener('DOMContentLoaded', function() {
        // Selectors for elements
        const assets = document.querySelectorAll('.asset img');
        const overlay = document.querySelector('.overlay');
        const previewButtons = document.querySelectorAll('.preview-button');
        const downloadLinks = document.querySelectorAll('.asset-overlay a');
        const filterButton = document.querySelector('.filter-button');
        const filterList = document.querySelector('.filter-list');
        const filterOptions = document.querySelectorAll('.filter-option');
        const modal = document.getElementById('sign-up-modal');
        const signUpButton = document.querySelector('.sign-up-button');
        const closeButton = document.querySelector('.close-button');
        const loginButton = document.querySelector('.login-button');
        const loginModal = document.querySelector('#login-modal');
        const closeButtonLogin = loginModal.querySelector('.close-button');
        const contactButton = document.getElementById('contact-us-button');
        const contactModal = document.getElementById('contact-modal');
        const closeContactButton = contactModal.querySelector('.close-button');
        const aboutUsLink = document.querySelector('#about-us-link');
        const aboutUsModal = document.querySelector('#about-us-modal');
        const closeAboutUsBtn = document.querySelector('.about-us-close-btn');
        const featuredButton = document.getElementById('featured-button');
        const uniqueNotifyButton = document.getElementById('unique-notify-button');
        const uniqueNotificationModal = document.getElementById('unique-notification-modal');
        const uniqueCloseButton = uniqueNotificationModal.querySelector('.unique-close-button');

        // Helper functions
        function openModal(modalElement) {
            modalElement.style.display = 'block';
        }

        function closeModal(modalElement) {
            modalElement.style.display = 'none';
        }

        function downloadImage(url) {
            const anchor = document.createElement('a');
            anchor.href = url;
            anchor.download = ''; // Automatically download with the original file name
            document.body.appendChild(anchor);
            anchor.click();
            document.body.removeChild(anchor);
        }

        function showPreview(src) {
            // Create and style preview image
            const previewImg = document.createElement('img');
            previewImg.src = src;
            previewImg.classList.add('preview');
            previewImg.style.position = 'fixed';
            previewImg.style.top = '50%';
            previewImg.style.left = '50%';
            previewImg.style.transform = 'translate(-50%, -50%)';
            previewImg.style.maxWidth = '80%';
            previewImg.style.maxHeight = '80%';
            previewImg.style.zIndex = '9999';
            previewImg.style.opacity = '0';
            previewImg.style.transition = 'opacity 0.3s ease';
            previewImg.style.cursor = 'pointer';

            // Append preview image to overlay and add active class
            overlay.appendChild(previewImg);
            overlay.classList.add('active');

            // Fade in preview image
            setTimeout(() => {
                previewImg.style.opacity = '1';
            }, 10);
        }

        function hidePreview() {
            // Remove all children and the active class from the overlay
            overlay.innerHTML = '';
            overlay.classList.remove('active');
        }

        // Event listeners
        // Asset click event listener to show preview
        assets.forEach(asset => {
            asset.addEventListener('click', function() {
                showPreview(this.src);
            });
        });

        // Preview button click event listener
        previewButtons.forEach(button => {
            button.addEventListener('click', function(event) {
                event.stopPropagation();
                const imgSrc = this.parentElement.previousElementSibling.src;
                showPreview(imgSrc);
            });
        });

        // Overlay click event listener to hide preview
        overlay.addEventListener('click', hidePreview);

        // Download link click event listener
        downloadLinks.forEach(link => {
            link.addEventListener('click', function(event) {
                event.preventDefault();
                const imgSrc = this.parentElement.querySelector('img').src;
                downloadImage(imgSrc);
            });
        });

        // Filter button event listener
        filterButton.addEventListener('click', function() {
            filterList.classList.toggle('active');
        });

        // Filter options event listeners
        filterOptions.forEach(option => {
            option.addEventListener('click', function(e) {
                e.preventDefault();
                const filter = this.dataset.filter;

                assets.forEach(asset => {
                    const category = asset.dataset.category;

                    if (filter === 'all') {
                        asset.style.display = 'block';
                    } else {
                        asset.style.display = category === filter ? 'block' : 'none';
                    }
                });
            });
        });

        // Sign-up button event listener to open modal
        signUpButton.addEventListener('click', () => openModal(modal));

        // Close button event listener to close sign-up modal
        closeButton.addEventListener('click', () => closeModal(modal));

        // Close modal when user clicks outside modal content
        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                closeModal(modal);
            }
        });

        // Login button event listener to open login modal
        loginButton.addEventListener('click', () => openModal(loginModal));

        // Close button event listener to close login modal
        closeButtonLogin.addEventListener('click', () => closeModal(loginModal));

        // Close login modal when user clicks outside modal content
        window.addEventListener('click', (event) => {
            if (event.target === loginModal) {
                closeModal(loginModal);
            }
        });

        // Contact button event listener to open contact modal
        contactButton.addEventListener('click', (event) => {
            event.preventDefault();
            openModal(contactModal);
        });

        // Close button event listener to close contact modal
        closeContactButton.addEventListener('click', (event) => {
            event.preventDefault();
            closeModal(contactModal);
        });

        // Close contact modal when user clicks outside modal content
        window.addEventListener('click', (event) => {
            if (event.target === contactModal) {
                closeModal(contactModal);
            }
        });

        // About Us link event listener to open About Us modal
        aboutUsLink.addEventListener('click', (event) => {
            event.preventDefault();
            openModal(aboutUsModal);
        });

        // Close button event listener to close About Us modal
        closeAboutUsBtn.addEventListener('click', () => closeModal(aboutUsModal));

        // Close About Us modal when user clicks outside modal content
        window.addEventListener('click', (event) => {
            if (event.target === aboutUsModal) {
                closeModal(aboutUsModal);
            }
        });

        // Event listener for the "FEATURED" button
        featuredButton.addEventListener('click', (event) => {
            event.preventDefault();
            shuffleImages();
        });

        // Function to shuffle the images in the asset container
        function shuffleImages() {
            const assetContainer = document.querySelector('.container');
            const assets = Array.from(document.querySelectorAll('.asset'));

            shuffleArray(assets);

            assetContainer.innerHTML = '';
            assets.forEach(asset => {
                assetContainer.appendChild(asset);
            });
        }

        // Event listener for the unique notification button to open the modal
        uniqueNotifyButton.addEventListener('click', () => openModal(uniqueNotificationModal));

        // Event listener for the close button to close the unique notification modal
        uniqueCloseButton.addEventListener('click', () => closeModal(uniqueNotificationModal));

        // Event listeners for allowing or declining notifications
        document.getElementById('unique-allow-notifications').addEventListener('click', function() {
            // Handle allowing notifications here
            alert('Notifications allowed.');
            closeModal(uniqueNotificationModal);
        });

        document.getElementById('unique-decline-notifications').addEventListener('click', function() {
            // Handle declining notifications here
            alert('Notifications declined.');
            closeModal(uniqueNotificationModal);
        });

        // Optional: Close the unique notification modal when the user clicks outside of the modal content
        window.addEventListener('click', (event) => {
            if (event.target === uniqueNotificationModal) {
                closeModal(uniqueNotificationModal);
            }
        });
    });
