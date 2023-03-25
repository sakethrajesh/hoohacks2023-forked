import axios from 'axios';

const config = {
    headers: { Authorization: `Bearer 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` }
};


export async function createImage(prompt) {
    
    const bodyParameters = {
        prompt: prompt, 
        n:1, 
    };
    
    await axios.post('https://api.openai.com/v1/images/generations', 
    bodyParameters,
    config
    )
        .then(function(data) {
            console.log(data);
            return data
        })
        .catch((error)=>{
            console.error(error);
        });
    }
    
    export async function segmentStory(story) {
        const query = "segment this story into 5 sections " + story
        const bodyParameters = {
        model: "gpt-3.5-turbo",
        messages: [{role: "user", content: query}],
    };
    
    await axios.post('https://api.openai.com/v1/chat/completions', 
        bodyParameters,
        config
    )
        .then(function(data) {
            console.log(data.data.choices[0].message.content);
            const result = data.data.choices[0].message.content
            const sections = parseOutline(result);
            const image_urls = loopAndGenerate(sections); 
        })
        .catch((error)=>{
            console.error(error);
        });
    }

    async function loopAndGenerate(sections) {
        // array of images (pages)
        const images = []
        for(let i = 0; i < sections.length; i++) {
            const url = await createImage(sections[i]);
            images.push(url)
            // write url to database
        }
        return images;
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