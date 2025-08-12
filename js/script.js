// Mobile Menu Toggle
document.querySelector('.mobile-menu').addEventListener('click', function() {
    document.querySelector('header nav').classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('header nav ul li a').forEach(link => {
    link.addEventListener('click', () => {
        document.querySelector('header nav').classList.remove('active');
    });
});

// Product Filtering
document.addEventListener('DOMContentLoaded', function() {
    const categoryFilter = document.getElementById('category');
    const sortFilter = document.getElementById('sort');
    const productGrid = document.querySelector('.product-grid');
    const products = Array.from(document.querySelectorAll('.product-card'));
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterProducts);
    }
    
    if (sortFilter) {
        sortFilter.addEventListener('change', filterProducts);
    }
    
    function filterProducts() {
        const categoryValue = categoryFilter ? categoryFilter.value : 'all';
        const sortValue = sortFilter ? sortFilter.value : 'popular';
        
        // Filter by category
        let filteredProducts = products;
        if (categoryValue !== 'all') {
            filteredProducts = products.filter(product => {
                return product.getAttribute('data-category') === categoryValue;
            });
        }
        
        // Sort products
        switch(sortValue) {
            case 'price-low':
                filteredProducts.sort((a, b) => {
                    const priceA = parseFloat(a.querySelector('.price').textContent.replace(/[^0-9.]/g, ''));
                    const priceB = parseFloat(b.querySelector('.price').textContent.replace(/[^0-9.]/g, ''));
                    return priceA - priceB;
                });
                break;
            case 'price-high':
                filteredProducts.sort((a, b) => {
                    const priceA = parseFloat(a.querySelector('.price').textContent.replace(/[^0-9.]/g, ''));
                    const priceB = parseFloat(b.querySelector('.price').textContent.replace(/[^0-9.]/g, ''));
                    return priceB - priceA;
                });
                break;
            case 'name':
                filteredProducts.sort((a, b) => {
                    const nameA = a.querySelector('h3').textContent.toLowerCase();
                    const nameB = b.querySelector('h3').textContent.toLowerCase();
                    return nameA.localeCompare(nameB);
                });
                break;
            default:
                // Default sorting (popular)
                break;
        }
        
        // Clear the grid
        productGrid.innerHTML = '';
        
        // Add filtered and sorted products
        filteredProducts.forEach(product => {
            productGrid.appendChild(product);
        });
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Form submission handling
const forms = document.querySelectorAll('form');
forms.forEach(form => {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Here you would typically send the form data to a server
        // For demonstration, we'll just show an alert
        alert('Thank you for your message! We will contact you soon.');
        form.reset();
    });
});

// Add to cart functionality
document.querySelectorAll('.product-card .btn').forEach(button => {
    button.addEventListener('click', function() {
        const productCard = this.closest('.product-card');
        const productName = productCard.querySelector('h3').textContent;
        const productPrice = productCard.querySelector('.price').textContent;
        
        // Here you would typically add the product to a shopping cart
        // For demonstration, we'll just show an alert
        alert(`Added ${productName} (${productPrice}) to your cart!`);
    });
});
