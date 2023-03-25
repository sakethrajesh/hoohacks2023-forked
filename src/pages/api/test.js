// import { Book, Page } from '@/models/models';
import axios from 'axios';
import mongoose from 'mongoose';

const config = {
    headers: { Authorization: `Bearer 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` }
};


export async function createImage(prompt) {
    
    const bodyParameters = {
        prompt: prompt, 
        n:1, 
    };
    console.log('starting');
    await axios.post('https://api.openai.com/v1/images/generations', 
    bodyParameters,
    config
    )
        .then(function(data) {
            console.log(data.data.data[0].url);
            console.log('end');
            return data
        })
        .catch((error)=>{
            console.error(error);
            console.log('end');
        });
}

export async function segmentStory(story) {
    const query = "segment this story into 2 sections " + story
    const bodyParameters = {
        model: "gpt-3.5-turbo",
        messages: [{role: "user", content: query}],
    };

    await axios.post('https://api.openai.com/v1/chat/completions', 
        bodyParameters,
        config
    )
        .then(async function(data) {
            console.log(data.data.choices[0].message.content);
            const result = data.data.choices[0].message.content
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
        .catch((error)=>{
            console.error(error);
        });
}

async function generateCover(topic) {
    const query = "create simple book cover for a book about" + topic

    const bodyParameters = {
        prompt: query, 
        n:1, 
    };
    
    await axios.post('https://api.openai.com/v1/images/generations', 
    bodyParameters,
    config
    )
        .then(function(data) {
            console.log(data);
            // should return url
            return data
        })
        .catch((error)=>{
            console.error(error);
        });
}

async function loopAndGenerate(sections) {
    // array of images (pages)
    const pages = []
    for(let i = 0; i < sections.length; i++) {
        const url = await createImage(sections[i]);
        // const newPage = new Page({
        //     pageNumber: i + 1,
        //     image: url,
        //     associatedSentences: sections[i]
        // })
        // pages.push(url)
        // write url to database
    }
    // array of pages
    return pages;
}

function parseOutline(text) {
    const sections = text.split('\n\n');
    return sections.map(section => section.trim());
}
    
    









// cohere.init(process.env.COHERE_KEY);

// const classify = async () => {
//     const response = await cohere.classify({
//       inputs: inputs,
//       examples: examples,
//     });

// }