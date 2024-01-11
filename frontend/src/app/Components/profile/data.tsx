export interface Match{
    winner : string;
    loser : string;
    winnerScore : string;
    loserScore : string;
}
export interface gameData{
    MatchHistory : Match[];
    wins : string;
    loses : string;
    level : string;
    goalsScored : string;
    goalsRecieved : string;
}

export const matchs = [] as Match[];
matchs.push({winner : "me", loser : "ahmed", winnerScore : "7", loserScore : "3"});
matchs.push({winner : "me", loser : "amine", winnerScore : "7", loserScore : "5"});
matchs.push({winner : "aymane", loser : "me", winnerScore : "7", loserScore : "2"});
matchs.push({winner : "youssef", loser : "me", winnerScore : "7", loserScore : "6"});
matchs.push({winner : "me", loser : "ibra", winnerScore : "7", loserScore : "3"});
matchs.push({winner : "said", loser : "me", winnerScore : "7", loserScore : "5"});
matchs.push({winner : "said", loser : "me", winnerScore : "7", loserScore : "5"});
matchs.push({winner : "said", loser : "me", winnerScore : "7", loserScore : "5"});
matchs.push({winner : "said", loser : "me", winnerScore : "7", loserScore : "5"});
matchs.push({winner : "said", loser : "me", winnerScore : "7", loserScore : "5"});
matchs.push({winner : "said", loser : "me", winnerScore : "7", loserScore : "5"});
matchs.push({winner : "said", loser : "me", winnerScore : "7", loserScore : "5"});
matchs.push({winner : "said", loser : "me", winnerScore : "7", loserScore : "5"});
matchs.push({winner : "said", loser : "me", winnerScore : "7", loserScore : "5"});
matchs.push({winner : "said", loser : "me", winnerScore : "7", loserScore : "5"});
matchs.push({winner : "said", loser : "me", winnerScore : "7", loserScore : "5"});
matchs.push({winner : "said", loser : "me", winnerScore : "7", loserScore : "5"});
matchs.push({winner : "said", loser : "me", winnerScore : "7", loserScore : "5"});
matchs.push({winner : "said", loser : "me", winnerScore : "7", loserScore : "5"});
matchs.push({winner : "said", loser : "me", winnerScore : "7", loserScore : "5"});
matchs.push({winner : "said", loser : "me", winnerScore : "7", loserScore : "5"});
matchs.push({winner : "said", loser : "me", winnerScore : "7", loserScore : "5"});
matchs.push({winner : "said", loser : "me", winnerScore : "7", loserScore : "5"});
matchs.push({winner : "said", loser : "me", winnerScore : "7", loserScore : "5"});
matchs.push({winner : "said", loser : "me", winnerScore : "7", loserScore : "5"});
matchs.push({winner : "said", loser : "me", winnerScore : "7", loserScore : "5"});
matchs.push({winner : "said", loser : "me", winnerScore : "7", loserScore : "5"});


export const Data = {
    MatchHistory : matchs,
    wins : "10",
    loses : "6",
    level : "2.36",
    goalsScored : "84",
    goalsRecieved : "52",
}
