const logos = [
  {
    path: "images/logo.png",
    name: "ME to WE Track Your Impact",
    value: "logo1",
    altTitle: "ME to WE + Tracke your Impact"
  },
  {
    path: "images/wedayConnect.jpg",
    name: "WE Day connect",
    value: "logo2",
    altTitle: "WE Day connect"
  },
  {
    path: "images/we.png",
    name: "WE",
    value: "logo3",
    altTitle: "WE"
  },
  {
    path: "images/metowe.png",
    name: "ME to WE",
    value: "logo4",
    altTitle: "ME to WE"
  }
];
const imageCarousel = [
  {
    path: "images/slider/image1.png",
    name: "Image 1",
    value: "image1",
    altTitle: "Slider 1"
  },
  {
    path: "images/slider/image2.jpg",
    name: "Image 2",
    value: "image2",
    altTitle: "Slider 2"
  },
  {
    path: "images/slider/image3.png",
    name: "Image 3",
    value: "image3",
    altTitle: "Slider 3"
  }
];
const webSelect = [
  {
    websiteName: "Canada English",
    value: "https://www.we.org"
  },
  {
    websiteName: "Canada French",
    value: "https://www.mouvementunis.org/"
  },
  {
    websiteName: "UK",
    value: "https://www.we.org/gb"
  },
  {
    websiteName: "Shop Canada",
    value: "https://ca.shop.metowe.com/"
  },
  {
    websiteName: "Shop International",
    value: "https://shop.metowe.com/"
  },
  {
    websiteName: "Track Your Impact",
    value: "https://www.trackyourimpact.com/"
  },
  {
    websiteName: "Donate",
    value: "https://www.wecharity.org/"
  },
  {
    websiteName: "Trips",
    value: "https://metowelodges.com/"
  }
];
const defaultContent = {
  logo: "images/defaultLogo.png",
  logoTitle: "Default Logo No Logo Selected",
  defaultpartnerCopy:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non convallis tellus. Proin volutpat augue a elementum accumsan. Maecenas eu magna eget orci bibendum viverra. Nulla sit amet rutrum nulla. Suspendisse sit amet iaculis tellus. Mauris quis dictum quam. Sed malesuada at erat sed suscipit.",
  defaultBanner: "images/defaultBannerForFun.gif",
  bannerTitle: "Found no banner! Shocking!!",
  defaultContentBlurb: "Because you are too lazy to add the title to widget",
  defaultNoWidgettitle: "You selected no Widget",
  defaultNoWidget: `images/nowidget.gif`
};
$(function() {
  /*TOGGLE Between the Widget When both the checkmarks Selected*/
  $(".toggleWidget").click(function() {
    $(this).toggleClass("active");
    if ($(this).hasClass("active")) {
      $(this).text("Have code?");
      $("#havecode").addClass("hide");
      $("#donthavecode").removeClass("hide");
    } else {
      $(this).text("Don't have code?");
      $("#havecode").removeClass("hide");
      $("#donthavecode").addClass("hide");
    }
  });
  for (let i = 0; i < logos.length; i++) {
    let logoSelect = $("#logoSelector");
    logoSelect.textContent = `<option value="${logos[i].value}">${
      logos[i].name
    }</option>`;

    $("#logoSelector").append(logoSelect.textContent);
  }

  // Dropdown for Carousel Image
  $(".imgCarouselSelect").select2({
    placeholder: "Select Carousel Image(s)"
  });
  for (let i = 0; i < imageCarousel.length; i++) {
    let imgCarouselSelectDrop = `<option value="${imageCarousel[i].path}">${
      imageCarousel[i].name
    }</option>`;

    $(".imgCarouselSelect").append(imgCarouselSelectDrop);
  }

  //Search Within Dropdown with Select2

  //***************** Actual Form Starting *******************

  $("form").on("submit", function(event) {
    event.preventDefault();
    //disabling the button after first submit
    $("#submitButton").attr("disabled", true);
    //Hide Form and show the widget
    $(".widgetArea").removeClass("hide");
    $(".widgetForm").addClass("hide");
    // allow to select the logo from the logos array consisting object path and value
    const logoSelected = $("#logoSelector").val();
    if (logoSelected !== "") {
      for (i = 0; i < logos.length; i++) {
        if (logoSelected === logos[i].value) {
          const imageSelected = `<img src="${logos[i].path}" alt="${
            logos[i].altTitle
          }" title="${logos[i].altTitle}" class="img-responsive centered"/>`;
          $(".logoSelected").append(imageSelected);
        }
      }
    } else {
      // Default Logo to be added if no logo selected
      $(".logoSelected").append(
        `<img src="${
          defaultContent.logo
        }" class="img-responsive centered" alt="${
          defaultContent.logoTitle
        }" title="${defaultContent.logoTitle}" />`
      );
    }

    // Add copy for the partnership
    const partnerCopy = $("#partnerCopy").val();
    if (partnerCopy !== "") {
      $(".partnerCopy").append(partnerCopy);
    } else {
      // Add default copy
      $(".partnerCopy").append(defaultContent.defaultpartnerCopy);
    }

    // select image for carousel may be from array consisting object path and value

    var imgCarouselSelectedArray = [];
    $.each($(".imgCarouselSelect option:selected"), function() {
      imgCarouselSelectedArray.push($(this).val());
    });
    let imgCarouselSelectedLinks = imgCarouselSelectedArray;
    if (imgCarouselSelectedLinks.length === 1) {
      // Single Image for Carousel
      $("#singleImage").removeClass("hide");
      $("#singleImage").append(
        `<img src="${
          imgCarouselSelectedLinks[0]
        }" class="img-responsive centered"/>`
      );
    } else if (imgCarouselSelectedLinks.length === 0) {
      // No Carousel Images seleceted
      $("#singleImage").removeClass("hide");
      $("#singleImage").append(
        `<img src="${
          defaultContent.defaultBanner
        }" class="img-responsive centered" alt="${
          defaultContent.bannerTitle
        }" title="${defaultContent.bannerTitle}"/>`
      );
    } else {
      $("#slider").removeClass("hide");
      for (let i = 0; i < imgCarouselSelectedLinks.length; i++) {
        $("#slider ul").append(
          `<li style="background-image:url('${
            imgCarouselSelectedLinks[i]
          }');background-position:50%;"></li>`
        );
      }
      // Carousel auto
      let carouselTime = 5000;
      setInterval(function() {
        moveRight();
      }, carouselTime);
      let slideCount = $("#slider ul li").length;
      let slideWidth = "100%";
      let sliderUlWidth = slideCount * slideWidth;
      let slideHeight = $("#slider ul li").height();
      $("#slider").css({ width: slideWidth, height: slideHeight });
      $("#slider ul").css({ ["maxwidth"]: sliderUlWidth });
      $("#slider ul li:last-child").prependTo("#slider ul");
      // Left slider
      function moveLeft() {
        $("#slider ul").animate(
          {
            left: +slideWidth
          },
          400,
          function() {
            $("#slider ul li:last-child").prependTo("#slider ul");
            $("#slider ul").css("left", "");
          }
        );
        carouselTime = carouselTime + 5000;
      }
      // Right slider
      function moveRight() {
        $("#slider ul").animate(
          {
            left: -slideWidth
          },
          400,
          function() {
            $("#slider ul li:first-child").appendTo("#slider ul");
            $("#slider ul").css("left", "");
          }
        );
      }
      // Icon controls for the sliders
      $("a.control_prev").click(function() {
        moveLeft();
      });

      $("a.control_next").click(function() {
        moveRight();
      });
    }

    //Add the copy paragraph
    const contentblurb = $("#contentblurb").val();
    if (contentblurb !== "") {
      $(".contentblurb").append(contentblurb);
    } else {
      $(".contentblurb").append(defaultContent.defaultContentBlurb);
    }

    // select the widgets if single (Code || Country) || Both with tab

    let result = $('input[type="checkbox"]:checked');
    // iframe for Code Widget
    const codeWidgetFrame = `<iframe src="https://www.trackyourimpact.com/partner-widget" scrolling="no" height="80" width="100%" frameborder="0"></iframe>`;
    const websiteWidgetFrame = `<form>
    <select class="webWidget" name="Website Dropdown">
      <option value="">Select the Site</option> </select
    ><button type="submit" class="submitWebButton submit-btn">
      &gt;
    </button>
  </form>`;

    if (result.length != 0) {
      let resultString = "";
      result.each(function() {
        resultString += $(this).val();
      });
      if (resultString === "codeWidgetCheckwebsiteWidgetCheck") {
        // Both Checkbox Selected
        $(".multipleWidget").removeClass("hide");
        $("#havecode").append(codeWidgetFrame);
        $("#donthavecode").append(websiteWidgetFrame);
      } else if (resultString === "codeWidgetCheck") {
        // Just the Code Widget Selected
        $(".singleWidget").removeClass("hide");
        $(".widget").append(codeWidgetFrame);
      } else if (resultString === "websiteWidgetCheck") {
        // Just the Web Widget Selected
        $(".singleWidget").removeClass("hide");
        $(".widget").append(websiteWidgetFrame);
      }
    } else {
      // NO CHECK BOX SELECTED
      $(".singleWidget").removeClass("hide");
      $(".contentblurb").text(defaultContent.defaultNoWidgettitle);
      $(".widget").append(
        `<img src="${
          defaultContent.defaultNoWidget
        }" class="img-responsive centered"/>
        <p class="warning text-center">The best practice is to add atleaset one widget.</p>`
      );
    }
    $('input:checkbox[id="websiteWidgetCheck"]:checked').each(function() {
      $(".webWidget").select2({
        placeholder: "Select Website"
      });
      for (let i = 0; i < webSelect.length; i++) {
        let websiteDrop = $(".country");
        websiteDrop = `<option value="${webSelect[i].value}">${
          webSelect[i].websiteName
        }</option>`;

        $(".webWidget").append(websiteDrop);
      }
      $(".submitWebButton").click(function() {
        event.preventDefault();
        const selectedWeb = $(this)
          .parent()
          .children()
          .children("option:selected")
          .val();

        window.open(selectedWeb);
      });
    });
  });
});
