// import { Book, Page } from '@/models/models';
import axios from "axios";
import mongoose from "mongoose";

const config = {
  headers: {
    Authorization: `Bearer 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`,
  },
};

export async function createImage(prompt) {
  const bodyParameters = {
    prompt: prompt,
    n: 1,
  };
  console.log("starting");
  const data = await axios
    .post(
      "https://api.openai.com/v1/images/generations",
      bodyParameters,
      config
    )
    .catch((error) => {
      console.error(error);
      console.log("end error!!!!!!!!!");
      return "PLEASE AHUDLASKD";
    });
    return data.data.data[0].url;

}

export async function segmentStory(story) {
  const query = "segment this story into 2 sections " + story;
  const bodyParameters = {
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: query }],
  };

  await axios
    .post("https://api.openai.com/v1/chat/completions", bodyParameters, config)
    .then(async function (data) {
      console.log(data.data.choices[0].message.content);
      const result = data.data.choices[0].message.content;
      const sections = await parseOutline(result);
      const pages = await loopAndGenerate(sections);
      const cover = await generateCover("princesses");
      // const newBook = await new Book({
      //     title: "this is a book",
      //     cover: cover,
      //     pages: pages
      // })
      // // write book to database
      // console.log(newBook);
      // return newBook;
    })
    .catch((error) => {
      console.error(error);
    });
}

async function generateCover(topic) {
  const query = "create simple book cover for a book about" + topic;

  const bodyParameters = {
    prompt: query,
    n: 1,
  };

  await axios
    .post(
      "https://api.openai.com/v1/images/generations",
      bodyParameters,
      config
    )
    .then(function (data) {
      console.log(data.data.data[0].url);
      // should return url
      return data.data.data[0].url;
    })
    .catch((error) => {
      console.error(error);
    });
}

async function loopAndGenerate(sections) {
  // array of images (pages)
  const pages = [];
  for (let i = 0; i < sections.length; i++) {
    
    const url = await createImage(sections[i]);
    console.log(url);

    pages.push({
      pageNumber: i + 1,
      image: url,
      associatedSentences: sections[i],
    });
    // const newPage = new Page({
    //     pageNumber: i + 1,
    //     image: url,
    //     associatedSentences: sections[i]
    // })
    // pages.pushurl)
    // write url to database
  }
  // array of pages
  console.log(pages);
  createPages(pages);
  return pages;
}

const createPages = async (pagesData) => {
  try {
    const response = await fetch("/api/createPages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ pagesData }),
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    console.log(data);
    // Handle successful page creation, e.g., display a success message or update the UI
  } catch (error) {
    console.error("Error creating pages:", error.message); // Log the error on the client-side
    // Handle errors, e.g., display an error message
  }
};

function parseOutline(text) {
  const sections = text.split("\n\n");
  return sections.map((section) => section.trim());
}

// cohere.init(process.env.COHERE_KEY);

// const classify = async () => {
//     const response = await cohere.classify({
//       inputs: inputs,
//       examples: examples,
//     });

// }
