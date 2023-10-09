import { Data } from "@/interface/info";
import React from "react";
import { ImHappy, ImSad, ImNeutral } from "react-icons/im";

type Props = {
  details: Data;
};

const Detail: React.FC<Props> = ({ details }) => {
  // Obtener la emoción con el score más alto y más bajo
  const highestEmotion = details.emotion[0][0];
  const lowestEmotion = details.emotion[0][details.emotion[0].length - 1];

  // Obtener los hashtags, menciones y emojis utilizados
  const hashtagRegex = /#[a-zA-Z0-9_]+/g;
  const mentionRegex = /@[a-zA-Z0-9_]+/g;
  const emojiRegex = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
  const mentions = details.text.inputs.match(mentionRegex);
  const hashtags = details.text.inputs.match(hashtagRegex);
  const emojis = details.text.inputs.match(emojiRegex);

  // Definir los emoticones correspondientes a cada emoción
  const emoticons: { [key: string]: string } = {
    anger: "😡",
    sadness: "😢",
    disgust: "🤢",
    others: "😐",
    fear: "😱",
    surprise: "😲",
    joy: "😄",
  };
  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-xl uppercase text-white text-center">
        Sentimientos
      </h2>
      <div className="flex justify-center items-center">
        <p className="text-white px-2">Su estado de ánimo más alto es: </p>
        {details.sentiment[0][0].label === "POS" ? (
          <ImHappy className="text-green-500 w-7 h-7" />
        ) : details.sentiment[0][0].label === "NEG" ? (
          <ImSad className="text-gray-700 w-7 h-7" />
        ) : (
          <ImNeutral className="text-yellow-500 w-7 h-7" />
        )}
      </div>
      <h2 className="font-bold text-xl uppercase text-white text-center mt-5">
        Emociones
      </h2>
      <div className="flex flex-col justify-center items-center px-4">
        <p className="text-sm text-white">
          Estado de emoción más alto:{" "}
          <span className="text-violet-800 text-lg font-bold">
            {highestEmotion.label}{" "}
          </span>
          {emoticons[highestEmotion.label]}
        </p>
        <p className="text-sm text-white">
          Estado de emoción más bajo:{" "}
          <span className="text-violet-800 text-lg font-bold">
            {lowestEmotion.label}{" "}
          </span>
          {emoticons[lowestEmotion.label]}
        </p>
        <div className="flex flex-col justify-center items-center">
          <p className="text-sm text-white">
            Hashtags utilizados: {hashtags?.length || 0}
          </p>
          <p className="text-violet-800 text-xs font-bold">
            {hashtags && hashtags.join(", ")}
          </p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <p className="text-sm text-white">
            Menciones utilizados: {mentions?.length || 0}
          </p>
          <p className="text-violet-800 text-xs font-bold">
            {mentions && mentions.join(", ")}
          </p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <p className="text-sm text-white">
            Emojis utilizados: {emojis?.length || 0}
          </p>
          <p className="text-violet-800 text-xs font-bold">
            {emojis && emojis.join(", ")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Detail;
