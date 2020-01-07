import React from 'react';

import './TextContainer.css';
import onlineIcon from '../../icons/onlineIcon.png';

// QR
let QRCode = require('qrcode.react');
let sitesList = [
  ["http://heeeeeeeey.com/"],
  ["http://tinytuba.com/"],
  ["http://corndog.io/"],
  ["http://thatsthefinger.com/"],
  ["http://cant-not-tweet-this.com/"],
  ["http://weirdorconfusing.com/"],
  ["http://eelslap.com/"],
  ["http://www.staggeringbeauty.com/"],
  ["http://burymewithmymoney.com/"],
  ["http://endless.horse/"],
  ["http://www.trypap.com/"],
  ["http://www.republiquedesmangues.fr/"],
  ["http://www.movenowthinklater.com/"],
  ["http://www.partridgegetslucky.com/"],
  ["http://www.rrrgggbbb.com/"],
  ["http://beesbeesbees.com/"],
  ["http://www.koalastothemax.com/"],
  ["http://www.everydayim.com/"],
  ["http://randomcolour.com/"],
  ["http://cat-bounce.com/"],
  ["http://chrismckenzie.com/"],
  ["http://hasthelargehadroncolliderdestroyedtheworldyet.com/"],
  ["http://ninjaflex.com/"],
  ["http://ihasabucket.com/"],
  ["http://corndogoncorndog.com/"],
  ["http://www.hackertyper.com/"],
  ["https://pointerpointer.com"],
  ["http://imaninja.com/"],
  ["http://www.ismycomputeron.com/"],
  ["http://www.nullingthevoid.com/"],
  ["http://www.muchbetterthanthis.com/"],
  ["http://www.yesnoif.com/"],
  ["http://iamawesome.com/"],
  ["http://www.pleaselike.com/"],
  ["http://crouton.net/"],
  ["http://corgiorgy.com/"],
  ["http://www.wutdafuk.com/"],
  ["http://unicodesnowmanforyou.com/"],
  ["http://www.crossdivisions.com/"],
  ["http://tencents.info/"],
  ["http://www.patience-is-a-virtue.org/"],
  ["http://pixelsfighting.com/"],
  ["http://isitwhite.com/"],
  ["http://onemillionlols.com/"],
  ["http://www.omfgdogs.com/"],
  ["http://oct82.com/"],
  ["http://chihuahuaspin.com/"],
  ["http://www.blankwindows.com/"],
  ["http://dogs.are.the.most.moe/"],
  ["http://tunnelsnakes.com/"],
  ["http://www.trashloop.com/"],
  ["http://www.ascii-middle-finger.com/"],
  ["http://spaceis.cool/"],
  ["http://www.donothingfor2minutes.com/"],
  ["http://buildshruggie.com/"],
  ["http://buzzybuzz.biz/"],
  ["http://yeahlemons.com/"],
  ["http://burnie.com/"],
  ["http://wowenwilsonquiz.com"],
  ["https://thepigeon.org/"],
  ["http://notdayoftheweek.com/"],
  ["http://www.amialright.com/"],
  ["http://nooooooooooooooo.com/"],
  ["https://greatbignothing.com/"],
  
];

const TextContainer = ({ users }) => (
    <div className="textContainer">
      <div>
        <h1>Realtime Chat Application <span role="img" aria-label="emoji">💬</span></h1>
        {/* <h2>Created with React, Express, Node and Socket.IO <span role="img" aria-label="emoji">❤️</span></h2> */}
        <h2>Secret App for Friends Who Don't Like Facebook</h2>
        <h2>Weird websites generator: <span role="img" aria-label="emoji">⬅️</span></h2>
        <QRCode value={sitesList[Math.floor(Math.random()*sitesList.length)][0]} />

      </div>
      {
        users
          ? (
            <div>
              <h1>People currently chatting:</h1>
              <div className="activeContainer">
                <h2>
                  {users.map(({name}) => (
                    <div key={name} className="activeItem">
                      {name}
                      <img alt="Online Icon" src={onlineIcon}/>
                    </div>
                  ))}
                </h2>
              </div>
            </div>
          )
          : null
      }
    </div>
);

export default TextContainer;
