// Load the model.
document.getElementById("loader").style.display = "block";
document.querySelector("section").classList.add("loading");

qna.load().then(model => {
  document.getElementById("loader").style.display = "none";
  document.querySelector("section").classList.remove("loading");
  //
  document.getElementById("context").innerText = "Google LLC is an American multinational technology company that specializes in Internet-related services and products, which include online advertising technologies, search engine, cloud computing, software, and hardware. It is considered one of the Big Four technology companies, alongside Amazon, Apple, and Facebook. Google was founded in September 1998 by Larry Page and Sergey Brin while they were Ph.D. students at Stanford University in California. Together they own about 14 percent of its shares and control 56 percent of the stockholder voting power through supervoting stock. They incorporated Google as a California privately held company on September 4, 1998, in California. Google was then reincorporated in Delaware on October 22, 2002. An initial public offering (IPO) took place on August 19, 2004, and Google moved to its headquarters in Mountain View, California, nicknamed the Googleplex. In August 2015, Google announced plans to reorganize its various interests as a conglomerate called Alphabet Inc. Google is Alphabet's leading subsidiary and will continue to be the umbrella company for Alphabet's Internet interests. Sundar Pichai was appointed CEO of Google, replacing Larry Page who became the CEO of Alphabet."
  document.getElementById("question").value = "Who is the CEO of Google?"
  //
  document.getElementById("submit-btn").addEventListener("click", async function () {
    let passage = document.getElementById("context").value;
    let question = document.getElementById("question").value;
    document.getElementById("loader").style.display = "block";

    let answers = await model.findAnswers(question, passage);
    document.getElementById("loader").style.display = "none";
    if (answers.length == 0) {
      document.getElementById("result").innerHTML = "No answer found!";
      return;
    } else {
      let result = answers[0].text + " - SCORE: " + answers[0].score.toFixed(2);
      document.getElementById("result").innerHTML = result;
    }
  });

  document.getElementById("file-upload").addEventListener("change", function () {
    let file = this.files[0];
    let reader = new FileReader();
    document.getElementById("loader").style.display = "block";
    reader.onload = async function () {
      let passage = reader.result;
      document.getElementById("context").innerText = passage;
      document.getElementById("loader").style.display = "none";
    };
    reader.readAsText(file);
  });
});

