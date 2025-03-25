// Counter Up
$(document).ready(function () {
  const counterUp = window.counterUp.default;
  const callback = (entries) => {
    entries.forEach((entry) => {
      const el = entry.target;
      if (entry.isIntersecting) {
        if (!el.classList.contains("is-visible")) {
          counterUp(el, {
            delay: 50,
            time: 1000,
          });
          el.classList.add("is-visible");
        }
      } else {
        el.classList.remove("is-visible");
      }
    });
  };
  const IO = new IntersectionObserver(callback, { threshold: 0.5 });
  const elements = document.querySelectorAll(".counterup-1");
  elements.forEach((el) => IO.observe(el));

  // Accordion
  const items = document.querySelectorAll(".accordion button");
  function toggleAccordion() {
    const itemToggle = this.getAttribute("aria-expanded");
    for (i = 0; i < items.length; i++) {
      items[i].setAttribute("aria-expanded", "false");
    }
    if (itemToggle == "false") {
      this.setAttribute("aria-expanded", "true");
    }
  }
  items.forEach((item) => item.addEventListener("click", toggleAccordion));

  // Testimonial Slider
  $(".cs-testimonial-slider").slick({
    dots: false,
    loop: false,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: false,
    prevArrow: $(".cs-testimonial-nav .slick-prev"),
    nextArrow: $(".cs-testimonial-nav .slick-next"),
    arrows: true,
  });

  // Scroll To Top
  const scrollToTopBtn = $(".scrollToTop");
  function handleScrollToTop() {
    if ($(window).scrollTop() > 400) {
      scrollToTopBtn.fadeIn();
    } else {
      scrollToTopBtn.fadeOut();
    }
  }
  $(window).on("scroll", handleScrollToTop);
  scrollToTopBtn.on("click", function () {
    $("html, body").animate({ scrollTop: 0 }, "slow");
  });
  handleScrollToTop();
});

/* =========================================================
    AOS Initialization
=========================================================*/
// AOS.init({
//   duration: 1000,
// });

/* =========================================================
    Sticky Header
=========================================================*/
$(window).scroll(function () {
  var scrollTop = $(this).scrollTop();
  if (scrollTop > 0) {
    $(".header").addClass("sticky");
    $(".resp-none").addClass("scroll-none");
  } else {
    $(".header").removeClass("sticky");
    $(".resp-none").removeClass("scroll-none");
  }
});
$(document).ready(function () {
  $("#headerNavbarDropdown").on("show.bs.collapse", function () {
    $("#menuIcon").removeClass("fa-bars").addClass("fa-xmark");
    $(".header").css("background", "#00000050");
  });

  $("#headerNavbarDropdown").on("hide.bs.collapse", function () {
    $("#menuIcon").removeClass("fa-xmark").addClass("fa-bars");
    $(".header").css("background", "");
  });
});

/* =========================================================
    Contact Form
=========================================================*/
$(document).ready(function () {
  $("#contactForm").on("submit", function (e) {
    e.preventDefault(); // Prevent default form submission

    $.ajax({
      url: "process-form.php",
      type: "POST",
      data: $(this).serialize(),
      dataType: "json",
      beforeSend: function () {
        $("#formMessage").html("Sending...").css("color", "blue");
      },
      success: function (response) {
        if (response.success) {
          $("#formMessage").html(response.message).css("color", "green");
          $("#contactForm")[0].reset(); // Reset form fields
        } else {
          $("#formMessage").html(response.message).css("color", "red");
        }
      },
      error: function () {
        $("#formMessage")
          .html("Something went wrong. Please try again.")
          .css("color", "red");
      },
    });
  });
});
