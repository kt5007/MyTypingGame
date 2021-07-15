"use strict";

{
  function setWord() {
    word = words.splice(Math.floor(Math.random() * words.length), 1)[0];
    target.textContent = word;
    loc = 0;
  }
  const words = ["red", "blue", "pink"];
  let word;
  let loc = 0; // 何文字めかを判断
  let startTime;
  let isPlaying = false;
  const target = document.getElementById("target");

  document.addEventListener("click", () => {
    // サイドクリックされたときにsetWordが再実行されないようにする
    if (isPlaying === true) {
      return;
    }
    isPlaying = true;
    startTime = Date.now();
    setWord();
  });

  // eで入力したものを取得
  document.addEventListener("keydown", (e) => {
    //早期リターン（いらない処理を除外する
    if (e.key !== word[loc]) {
      return;
    }

    loc++;

    //状態 1:_ed 2:__d 3:___
    target.textContent = "_".repeat(loc) + word.substring(loc);

    if (loc === word.length) {
      if (words.length === 0) {
        // 1000で割るのはmsecのため　toFixedで小数点以下を２桁まで表示
        const elapsedTime = ((Date.now() - startTime) / 1000).toFixed(2);
        const result = document.getElementById("result");
        result.textContent = `Finished! ${elapsedTime} seconds!`;
        return;
      }
      setWord();
    }
  });
}
