document.addEventListener('DOMContentLoaded', () => {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const sections = document.querySelectorAll('.func_section');
  
    tabButtons.forEach(button => {
      button.addEventListener('click', () => {
       
        tabButtons.forEach(btn => btn.classList.remove('active'));
        sections.forEach(sec => sec.classList.remove('active'));
  
        
        button.classList.add('active');
        const targetId = button.getAttribute('data');
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
          targetSection.classList.add('active');
        }
      });
    });
  });



document.querySelectorAll('.tag_btn').forEach(button => {
    button.addEventListener('click', () => {
        button.classList.toggle('selected');
    });
});


document.querySelectorAll('input[name="gender"]').forEach(radio => {
  radio.addEventListener('change', () => {
    const selectedValue = radio.value;
    const image = document.getElementById('body_image');

    if (selectedValue === 'male') {
      image.src = 'assets/male.png'; 
    } else if (selectedValue === 'female') {
      image.src = 'assets/female.png'; 
    }
  });
});

document.querySelectorAll('.signup_input_wrapper input').forEach((input) => {
  const wrapper = input.closest('.signup_input_wrapper');

  // On focus
  input.addEventListener('focus', () => {
    wrapper.classList.add('filled');
  });

  // On blur
  input.addEventListener('blur', () => {
    if (input.value.trim() === '') {
      wrapper.classList.remove('filled');
    }
  });

  if (input.value.trim() !== '') {
    wrapper.classList.add('filled');
  }
});

function showSidebar(){
  const sidebar = document.querySelector('.side_nav_links');
  sidebar.style.display = 'flex';
}

function hideSidebar(){
  const sidebar = document.querySelector('.side_nav_links');
  sidebar.style.display = 'none'
}

