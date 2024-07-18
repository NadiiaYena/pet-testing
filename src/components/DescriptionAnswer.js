import React from 'react';
import '../App.css';


export default function DescriptionAnswer({ count, randomQuestions }){
    console.log('completedQuestions', randomQuestions);
    const answerOfUser = randomQuestions[count].answerOfUser;
    const expectedAnswer = randomQuestions[count].answer;

    return (
        <div className="description">
            {answerOfUser && <>
                <div className="tabs">
                    <p className='tab'>ВІДПОВІДЬ</p>
                </div>
                <div className="tab-info">
                    {answerOfUser}
                </div>
            </>}
            <div className="tabs">
                <p className='tab'>ОЧІКУВАНА ВІДПОВІДЬ</p>
            </div>
            <div className="tab-info">
                {expectedAnswer}
            </div>
        </div>
    )
}