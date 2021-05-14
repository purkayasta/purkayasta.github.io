const about = document.querySelector("#about");
const contact = document.querySelector("#contact");
const resume = document.querySelector("#resume");
const aboutContent = document.querySelector("#about-content");
const contactContent = document.querySelector("#contact-content");
const resumeContent = document.querySelector("#resume-content");

about.addEventListener("click", () => {
  const aboutBox = new WinBox({
    title: "About Me",
    width: "450px",
    height: "500px",
    top: 50,
    right: 50,
    bottom: 50,
    left: 50,
    mount: aboutContent,
    onfocus: function () {
      this.setBackground("darkred");
    },
    onblur: function () {
      this.setBackground("#777");
    },
  });
});

contact.addEventListener("click", () => {
  const contactBox = new WinBox({
    title: "Contact Me",
    width: "350px",
    height: "200px",
    top: 150,
    right: 50,
    bottom: 50,
    left: 250,
    mount: contactContent,
    onfocus: function () {
      this.setBackground("darkgreen");
    },
    onblur: function () {
      this.setBackground("#777");
    },
  });
});

resume.addEventListener("click", () => {
  const resumeWinBox = new WinBox({
    title: "Resume",
    modal: true,
    width: "70%",
    height: "90%",
    top: 50,
    right: 50,
    bottom: 50,
    left: 50,
    mount: resumeContent,
    onfocus: function () {
      this.setBackground("darkblue");
    },
    onblur: function () {
      this.setBackground("#777");
    },
  });
});
