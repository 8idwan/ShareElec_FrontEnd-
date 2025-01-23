document.addEventListener('DOMContentLoaded', () => {
  const isLoggedIn = localStorage.getItem('user-token') || sessionStorage.getItem('user-session');
  const accountOptions = document.querySelector('.account-options');
  
  if (!isLoggedIn && accountOptions) {
    // Remove user menu and notifications if they exist
    const userMenu = accountOptions.querySelector('.user-menu-wrapper');
    const notificationsButton = accountOptions.querySelector('.notifications-button');
    
    if (userMenu) userMenu.remove();
    if (notificationsButton) notificationsButton.remove();
    
    // Add auth buttons if they don't exist
    if (!accountOptions.querySelector('.auth-buttons')) {
      const authButtons = document.createElement('div');
      authButtons.className = 'auth-buttons';
      authButtons.innerHTML = `
        <a href="login.html" class="btn-login">Connexion</a>
        <a href="register.html" class="btn-register">Inscription</a>
      `;
      accountOptions.appendChild(authButtons);
    }
  }

  addOfferButtonHandlers();
  addContactButtonHandlers();
  initializeSellModal();
  initializeNotifications();
  initializeSearchAndFilters();
  initializeRegistrationForm();
  initializePaymentForm();
  initializeLogout();
  if (window.location.pathname.includes('mes-offres.html')) {
    initializeMyOffers();
  }
  if (window.location.pathname.includes('profile.html')) {
    initializeProfileEdit();
  }
});

function addOfferButtonHandlers() {
  const offerButtons = document.querySelectorAll('.offer-card .btn-primary');
  
  offerButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const card = e.target.closest('.offer-card');
      const price = card.querySelector('.price').textContent;
      const seller = card.querySelector('.name-badge').childNodes[0].textContent.trim();
      const quantity = card.querySelector('.offer-details p:first-child').textContent.match(/\d+/)[0];
      const totalPrice = (parseFloat(price) * parseFloat(quantity)).toFixed(2);
      
      // Show payment modal
      const modalOverlay = document.querySelector('.payment-modal-overlay');
      const totalElement = modalOverlay.querySelector('.payment-total');
      totalElement.textContent = `${totalPrice} €`;
      modalOverlay.classList.add('active');
    });
  });
}

function addContactButtonHandlers() {
  const contactButtons = document.querySelectorAll('.offer-card .btn-secondary');
  
  contactButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const card = e.target.closest('.offer-card');
      const seller = card.querySelector('.name-badge').childNodes[0].textContent.trim();
      
      console.log(`Contacting ${seller}`);
      
      // Show feedback
      const originalText = button.textContent;
      button.textContent = 'Message Envoyé !';
      button.disabled = true;
      
      setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
      }, 2000);
    });
  });
}

function initializeSellModal() {
  const sellButton = document.querySelector('.btn-sell');
  const modalOverlay = document.querySelector('.modal-overlay');
  const closeButton = document.querySelector('.modal-close');
  const sellForm = document.querySelector('#sellForm');

  if (sellButton) {
    sellButton.addEventListener('click', () => {
      modalOverlay.classList.add('active');
    });
  }

  if (closeButton) {
    closeButton.addEventListener('click', () => {
      modalOverlay.classList.remove('active');
    });
  }

  modalOverlay?.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      modalOverlay.classList.remove('active');
    }
  });

  if (sellForm) {
    sellForm.addEventListener('submit', (e) => {
      e.preventDefault();
      // Handle form submission
      const formData = new FormData(sellForm);
      console.log('Creating new offer:', Object.fromEntries(formData));
      
      // Show feedback
      sellForm.reset();
      modalOverlay.classList.remove('active');
      // You could add a toast notification here
    });
  }
}

function initializeNotifications() {
  const notificationsButton = document.querySelector('.notifications-button');
  
  if (notificationsButton) {
    notificationsButton.addEventListener('click', () => {
      // Here you would typically show a notifications dropdown/modal
      console.log('Notifications clicked');
      
      // For demo purposes, let's toggle the badge
      const badge = notificationsButton.querySelector('.notification-badge');
      if (badge) {
        badge.style.display = badge.style.display === 'none' ? 'flex' : 'none';
      }
    });
  }
}

function initializeSearchAndFilters() {
  const searchInput = document.querySelector('.search-bar input');
  const filterSelects = document.querySelectorAll('.filter-select');
  const offersGrid = document.querySelector('.offers-grid');

  // Search functionality
  let searchTimeout;
  searchInput?.addEventListener('input', (e) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      const searchTerm = e.target.value.toLowerCase();
      filterOffers();
    }, 300);
  });

  // Filter functionality
  filterSelects.forEach(select => {
    select?.addEventListener('change', () => {
      filterOffers();
    });
  });

  function filterOffers() {
    const searchTerm = searchInput.value.toLowerCase();
    const typeFilter = document.getElementById('typeFilter').value;
    const energyFilter = document.getElementById('energyFilter').value;
    const priceFilter = document.getElementById('priceFilter').value;
    const dateFilter = document.getElementById('dateFilter').value;

    const offers = Array.from(offersGrid.children);

    offers.forEach(offer => {
      let show = true;

      // Search filter
      if (searchTerm) {
        const offerText = offer.textContent.toLowerCase();
        show = show && offerText.includes(searchTerm);
      }

      // Type filter
      if (typeFilter) {
        const userType = offer.querySelector('.user-type').textContent.toLowerCase();
        show = show && userType.includes(typeFilter);
      }

      // Energy filter
      if (energyFilter) {
        const energy = offer.querySelector('.offer-details').textContent.toLowerCase();
        show = show && energy.includes(energyFilter);
      }

      // Apply visibility
      offer.style.display = show ? 'block' : 'none';
    });

    // Sort by price
    if (priceFilter) {
      const sortedOffers = offers
        .filter(offer => offer.style.display !== 'none')
        .sort((a, b) => {
          const priceA = parseFloat(a.querySelector('.price').textContent);
          const priceB = parseFloat(b.querySelector('.price').textContent);
          return priceFilter === 'asc' ? priceA - priceB : priceB - priceA;
        });
      
      sortedOffers.forEach(offer => offersGrid.appendChild(offer));
    }

    // Sort by date
    if (dateFilter) {
      const sortedOffers = offers
        .filter(offer => offer.style.display !== 'none')
        .sort((a, b) => {
          const timeA = a.querySelector('.offer-timestamp').textContent;
          const timeB = b.querySelector('.offer-timestamp').textContent;
          return dateFilter === 'recent' ? 
            timeA.localeCompare(timeB) : 
            timeB.localeCompare(timeA);
        });
      
      sortedOffers.forEach(offer => offersGrid.appendChild(offer));
    }
  }
}

function initializeRegistrationForm() {
  const form = document.getElementById('registerForm');
  const userTypeInputs = document.querySelectorAll('input[name="userType"]');
  const professionalFields = document.getElementById('professionalFields');

  if (!form) return;

  // Toggle professional fields based on user type selection
  userTypeInputs.forEach(input => {
    input.addEventListener('change', (e) => {
      professionalFields.style.display = 
        e.target.value === 'professional' ? 'block' : 'none';
    });
  });

  // Handle form submission
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Validate passwords match
    const password = form.querySelector('#password').value;
    const confirmPassword = form.querySelector('#confirmPassword').value;
    
    if (password !== confirmPassword) {
      alert('Les mots de passe ne correspondent pas');
      return;
    }

    // Collect form data
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    try {
      // Here you would typically make an API call to register the user
      console.log('Registering user:', data);
      
      // Show success message
      alert('Inscription réussie ! Vous allez être redirigé vers la page de connexion.');
      
      // Redirect to login page
      // window.location.href = '/login';
      
    } catch (error) {
      console.error('Registration error:', error);
      alert('Une erreur est survenue lors de l\'inscription. Veuillez réessayer.');
    }
  });
}

function initializeMyOffers() {
  const editButtons = document.querySelectorAll('.btn-edit');
  const deleteButtons = document.querySelectorAll('.btn-delete');
  const modalOverlay = document.querySelector('.modal-overlay');
  const offerForm = document.getElementById('offerForm');

  // Edit offer
  editButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const card = e.target.closest('.offer-card');
      const amount = card.querySelector('p:nth-child(1)').textContent.match(/\d+/)[0];
      const price = card.querySelector('.price').textContent;
      const source = card.querySelector('p:nth-child(3)').textContent.split(': ')[1];

      // Pre-fill form
      offerForm.querySelector('[name="amount"]').value = amount;
      offerForm.querySelector('[name="price"]').value = price;
      offerForm.querySelector('[name="source"]').value = source.toLowerCase();

      // Show modal
      modalOverlay.classList.add('active');
    });
  });

  // Delete offer
  deleteButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      if (confirm('Êtes-vous sûr de vouloir supprimer cette offre ?')) {
        const card = e.target.closest('.offer-card');
        card.remove();
        // Here you would typically make an API call to delete the offer
      }
    });
  });

  // Handle form submission
  offerForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(offerForm);
    console.log('Updating offer:', Object.fromEntries(formData));
    
    modalOverlay.classList.remove('active');
    // Here you would typically make an API call to update the offer
    alert('Offre mise à jour avec succès !');
  });
}

function initializeProfileEdit() {
  const editProfileBtn = document.querySelector('.edit-profile-btn');
  const editPhotoBtn = document.querySelector('.edit-photo-btn');
  const modalOverlay = document.querySelector('#editProfileModal');
  const editProfileForm = document.querySelector('#editProfileForm');

  // Edit profile button handler
  editProfileBtn?.addEventListener('click', () => {
    modalOverlay.classList.add('active');
  });

  // Edit photo button handler
  editPhotoBtn?.addEventListener('click', () => {
    // Here you would typically open a file picker
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const profilePic = document.querySelector('.profile-picture');
          profilePic.src = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  });

  // Modal close button handler
  const closeButton = modalOverlay?.querySelector('.modal-close');
  closeButton?.addEventListener('click', () => {
    modalOverlay.classList.remove('active');
  });

  // Close modal when clicking outside
  modalOverlay?.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      modalOverlay.classList.remove('active');
    }
  });

  // Add delete profile button handler
  const deleteProfileBtn = document.querySelector('.delete-profile-btn');
  deleteProfileBtn?.addEventListener('click', () => {
    if (confirm('Êtes-vous sûr de vouloir supprimer votre profil ? Cette action est irréversible.')) {
      // Here you would typically make an API call to delete the profile
      alert('Profil supprimé avec succès. Vous allez être redirigé vers la page d\'accueil.');
      // Redirect to home or login page
      // window.location.href = '/';
    }
  });

  // Form submission handler
  editProfileForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(editProfileForm);
    
    // Update profile information
    const profileName = document.querySelector('.profile-details h1');
    const userType = document.querySelector('.user-type');
    const aboutSection = document.querySelector('.about-section p');
    const contactInfo = document.querySelector('.contact-info');
    
    profileName.textContent = formData.get('fullName');
    userType.textContent = formData.get('userType').charAt(0).toUpperCase() + formData.get('userType').slice(1);
    aboutSection.textContent = formData.get('about');
    
    // Update contact information
    contactInfo.innerHTML = `
      <div><strong>Email:</strong> ${formData.get('email')}</div>
      <div><strong>Téléphone:</strong> ${formData.get('phone')}</div>
      <div><strong>Localisation:</strong> ${formData.get('location')}</div>
    `;

    // Close modal
    modalOverlay.classList.remove('active');

    // Show success message
    alert('Profil mis à jour avec succès !');
  });
}

function initializePaymentForm() {
  const paymentForm = document.getElementById('paymentForm');
  const modalOverlay = document.querySelector('.payment-modal-overlay');
  const closeButton = modalOverlay.querySelector('.modal-close');

  closeButton?.addEventListener('click', () => {
    modalOverlay.classList.remove('active');
  });

  modalOverlay?.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      modalOverlay.classList.remove('active');
    }
  });

  paymentForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Show processing state
    const submitButton = paymentForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = 'Traitement en cours...';
    
    // Simulate payment processing
    setTimeout(() => {
      modalOverlay.classList.remove('active');
      alert('Paiement effectué avec succès !');
      submitButton.disabled = false;
      submitButton.textContent = originalText;
      paymentForm.reset();
    }, 2000);
  });

  // Add input formatting
  const cardNumber = document.getElementById('cardNumber');
  const cardExpiry = document.getElementById('cardExpiry');
  const cardCVC = document.getElementById('cardCVC');

  cardNumber?.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\s/g, '').replace(/\D/g, '');
    let formattedValue = '';
    for (let i = 0; i < value.length; i++) {
      if (i > 0 && i % 4 === 0) {
        formattedValue += ' ';
      }
      formattedValue += value[i];
    }
    e.target.value = formattedValue.slice(0, 19);
  });

  cardExpiry?.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 2) {
      value = value.slice(0, 2) + '/' + value.slice(2);
    }
    e.target.value = value.slice(0, 5);
  });

  cardCVC?.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/\D/g, '').slice(0, 3);
  });
}

function initializeLogout() {
  const logoutButton = document.querySelector('.logout-button');
  if (logoutButton) {
    logoutButton.addEventListener('click', () => {
      // Here you would typically clear session/tokens
      localStorage.removeItem('user-token');
      sessionStorage.removeItem('user-session');
      
      // Switch to logged out view - show auth buttons, hide user menu
      const userMenu = document.querySelector('.user-menu-wrapper');
      const notificationsButton = document.querySelector('.notifications-button');
      const authButtons = document.createElement('div');
      authButtons.className = 'auth-buttons';
      authButtons.innerHTML = `
        <a href="login.html" class="btn-login">Connexion</a>
        <a href="register.html" class="btn-register">Inscription</a>
      `;
      
      if (userMenu) {
        userMenu.remove();
      }
      if (notificationsButton) {
        notificationsButton.remove();
      }
      
      const accountOptions = document.querySelector('.account-options');
      accountOptions.appendChild(authButtons);
    });
  }
}