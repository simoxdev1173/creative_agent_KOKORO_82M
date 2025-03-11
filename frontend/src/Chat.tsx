import { Button } from "./components/ui/button"
import { Textarea } from "./components/ui/textarea"
import {useState} from 'react'
import axios from 'axios'
import Groq from "groq-sdk";
function Chat() {
    const handleSubmit = () => {
      setMsgBtnState("generating audio....")
      axios.post('http://127.0.0.1:5000/tts',  
      {
        text : text || "Hello World !" ,
        voice  : voice || 'af_heart'
      })
      .then(function (response){
        console.log(response)
        const audioDataUrl = `data:audio/wav;base64,${response.data.audio}`;
        setAudio(audioDataUrl);
      })
      .catch(function (errr){
        console.log(errr)
      })
      .finally(function(){
        setText('');
        setMsgBtnState("Send message");
      })
    }
    const generateText = async () => {
      setGenBtnState("....")
      console.log("Environment variables:", import.meta.env);
      const groq = new Groq({ apiKey: "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" ,
        dangerouslyAllowBrowser: true,
      });
      try {
        const chatCompletion = await groq.chat.completions.create({
          messages: [
            {
              role: "user",
              content: "Generate a random phrase about programming",
            },
          ],
          model: "llama-3.3-70b-versatile",
        });
        setText(chatCompletion.choices[0]?.message?.content || "Error: No content returned");
      } catch(err) {
        console.error("Groq API Error:", err);
        setText("Error: Could not generate text");
      }
      finally{
        setGenBtnState("Generate text");
      }
    };

    const [voice , setVoice] = useState('');
    const [text , setText] = useState('');
    const [audio , setAudio] = useState('');
    const [genBtnState , setGenBtnState] = useState('Generate text');
    const [msgBtnState , setMsgBtnState] = useState('Send message');

  return (
    <div className="grid w-full gap-4 max-w-md mx-auto p-8">
      <span>
        <strong>Choose a voice: </strong> <br/>
        <select onChange={(E)=>setVoice(E.target.value)}>
          <option value='af_heart'>af_heart</option>
          <option value='am_michael'>am_michael</option>
          <option value='af_river'>af_river</option>
        </select>
      </span>

      <Textarea onChange={(e)=>setText(e.target.value)} placeholder="Type your message here." value={text}/>
      <Button type="submit" onClick={handleSubmit}>{msgBtnState}</Button>
      <Button onClick={generateText}>{genBtnState}</Button>
      {audio && <audio src={audio} autoPlay>The audio is not working</audio>}
    </div>
  )
}
export default Chat;