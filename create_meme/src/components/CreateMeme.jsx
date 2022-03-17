import React, { useEffect, useState } from "react";
import $ from "jquery";
import Draggable from "react-draggable";
import canvas from "canvas";
import { Card } from "react-bootstrap";
function CreateMeme() {
  const [isimage,setIsImage] = useState(false);
  const style = {
    Font: "17px Calibri",
  };
  let textContainer;
  let x;
  let t = "sample text";
  function writeText(ele) {
    t = ele.target.value;
    document.getElementById("theText").innerHTML = t.replace(
      /\n\r?/g,
      "<br />"
    );
  }
  function showImage(fl) {
    setIsImage(true)
    fl = fl.target;

    if (fl.files.length > 0) {
      let reader = new FileReader();

      reader.onload = function (e) {
        let img = new Image();

        img.onload = function () {
          if (
            this.width > window.screen.width ||
            this.height > window.screen.height
          ) {
            setIsImage(false);
            alert(
              "Please select a small image. The image width and height should be less than the screen width and height."
            );

            document.getElementById("theText").style.display = "none";
            document.getElementById("myimage").src = "";
          } else {
            document.getElementById("theText").style.display = "block";
            document.getElementById("bt").style.display = "block";
            document.getElementById("textArea").style.display = "block";
          }
        };

        img.src = e.target.result; // actual image.
        document.getElementById("myimage").src = reader.result; // Add the image on the form.
      };
      reader.readAsDataURL(fl.files[0]);
    }
  }
  function saveImageWithText() {
    textContainer = document.getElementById("theText");

    // Create an image object.
    let img = new Image();
    img.src = document.getElementById("myimage").src;
    if(! isimage){
      alert("please select image first")
    }

    // Create a canvas object.
    let canvas = document.createElement("canvas");

    // Wait till the image is loaded.
    img.onload = function () {
      drawImage();
      downloadImage(img.src.replace(/^.*[\\\/]/, "")); // Download the processed image.
    };

    // Draw the image on the canvas.
    let drawImage = () => {
      let ctx = canvas.getContext("2d"); // Create canvas context.

      // Assign width and height.
      canvas.width = img.width;
      canvas.height = img.height;

      // Draw the image.
      ctx.drawImage(img, 0, 0);

      textContainer.style.border = 0;

      // Get the padding etc.
      let left = parseInt(window.getComputedStyle(textContainer).left);
      let right = textContainer.getBoundingClientRect().right;
      let top = parseInt(window.getComputedStyle(textContainer).top, 0);
      let center = textContainer.getBoundingClientRect().width / 2;

      let paddingTop = window
        .getComputedStyle(textContainer)
        .paddingTop.replace("px", "");
      let paddingLeft = window
        .getComputedStyle(textContainer)
        .paddingLeft.replace("px", "");
      let paddingRight = window
        .getComputedStyle(textContainer)
        .paddingRight.replace("px", "");

      // Get text alignement, colour and font of the text.
      let txtAlign = window.getComputedStyle(textContainer).textAlign;
      let color = window.getComputedStyle(textContainer).color;
      let fnt = window.getComputedStyle(textContainer).font;

      // Assign text properties to the context.
      ctx.font = fnt;
      ctx.fillStyle = color;
      ctx.textAlign = txtAlign;

      // Now, we need the coordinates of the text.
      // coordinate.

      if (txtAlign === "right") {
    
        x = right + parseInt(paddingRight) - 11;
      }
      if (txtAlign === "left") {
       

        x = left + parseInt(paddingLeft);
      }
      if (txtAlign === "center") {
        x = center + left;
      } 

      // Get the text (it can a word or a sentence) to write over the image.
      let str = t.replace(/\n\r?/g, "<br />").split("<br />");

      // finally, draw the text using Canvas fillText() method.
      for (let i = 0; i <= str.length - 1; i++) {
        ctx.fillText(
          str[i].replace("</div>", "").replace("<br>", "").replace(";", ""),
          x,
          parseInt(paddingTop, 10) + parseInt(top, 10) + 10 + i * 15
        );
      }

      document.body.append(canvas); // Show the image with the text on the Canvas.
    };

    // Download the processed image.
    let downloadImage = (img_name) => {
      let a = document.createElement("a");
      a.href = canvas.toDataURL("image/png");
      a.download = img_name;
      document.body.appendChild(a);
      a.click();
    };
  }

  return (
    <div className="">
      <center><Card className="col-6 rounded m-4">
        <Card.Header style={{backgroundColor:"whitesmoke"}}>
          <p>
            <input
              type="submit"
              id="btChooseImage"
              className="btn btn-primary"
              onClick={() => {
                document.getElementById("file").click();
              }}
              value="Select an image"
            />
          </p>
          <input
            type="file"
            id="file"
            onChange={showImage}
            style={{ display: "none", visibility: "hidden", width: "1px" }}
          />

          <p>
            <textarea
              onKeyUp={writeText}
              id="textArea"
              placeholder="Enter some value for text"
              rows="2"
              cols="50"
            ></textarea>
          </p>
        </Card.Header>
        <Card.Subtitle className="m-3">
          <h2>Operations </h2>
          <button
            className="btn btn-outline-dark m-1"
            onClick={() => {
              $("#theText")
                .css("left", "auto")
                .css("right", "0")
                .css("top", "0")
                .css("bottom", "auto");
            }}
          >
            top right
          </button>

          <button
            className="btn btn-outline-dark m-1"
            onClick={() => {
              $("#theText")
                .css("left", "0")
                .css("right", "auto")
                .css("top", "0")
                .css("bottom", "auto");
            }}
          >
            top left
          </button>
          <button
            className="btn btn-outline-dark m-1"
            onClick={() => {
              $("#theText")
                .css("left", "auto")
                .css("right", "0")
                .css("top", "auto")
                .css("bottom", "0");
            }}
          >
            bottom right
          </button>
          <button
            className="btn btn-outline-dark m-1"
            onClick={() => {
              $("#theText")
                .css("left", "0")
                .css("right", "auto")
                .css("top", "auto")
                .css("bottom", "0");
            }}
          >
            bottom left
          </button>
        </Card.Subtitle>
        <Card.Body>
          <div >
            {/* <!--The parent container, image and container for text (to place over the image)--> */}
            <div
              style={{
                position: "relative",
                padding: 0,
                minWidth: "250px",
                minHeight: "250px",
                display: "inline-block",
                margin: "0 auto",
                border: "2px solid black" 
              }}
              id="mainContainer"
            >
              {/* <!--The default image. You can select a different image too.--> */}
              <img
                src=""
                id="myimage"
                alt=""
              />

              {/* <!--The text, which is also draggable.--> */}

              <div id="theText"></div>
            </div>

            {/* <!--Button to save the image with the text.--> */}
            <p>
              <input
                type="button"
                className="btn btn-success mt-4"
                onClick={saveImageWithText}
                id="bt"
                value="Save the Image"
              />
            </p>
          </div>
        </Card.Body>
        <Card.Footer>
        <h1>Demo</h1>
        </Card.Footer>
      </Card>
      </center>
    </div>
  );
}

export default CreateMeme;
