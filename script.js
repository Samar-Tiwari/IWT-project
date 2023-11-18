let players = [];

function addPlayer() {
  const playerNameInput = document.getElementById("playerName");
  const playerPositionSelect = document.getElementById("playerPosition");

  const playerName = playerNameInput.value.trim();
  const playerPosition = playerPositionSelect.value;

  if (playerName === "") {
    alert("Please enter a player name.");
    return;
  }

  players.push({ name: playerName, position: playerPosition });
  playerNameInput.value = "";

  displayPlayers();
}

function displayPlayers() {
  const playerListContainer = document.getElementById("playerList");
  playerListContainer.innerHTML = "";

  players.forEach((player, index) => {
    const playerDiv = createPlayerDiv(player, index);
    playerListContainer.appendChild(playerDiv);
  });
}

function createPlayerDiv(player, index) {
  const playerDiv = document.createElement("div");
  playerDiv.textContent = `${player.name} (${getPlayerPositionName(
    player.position
  )})`;
  playerDiv.classList.add("player-item");

  playerDiv.addEventListener("mouseenter", () => {
    playerDiv.classList.add("remove-hover");
  });

  playerDiv.addEventListener("mouseleave", () => {
    playerDiv.classList.remove("remove-hover");
  });

  playerDiv.addEventListener("click", () => {
    removePlayer(index);
  });

  return playerDiv;
}

function removePlayer(index) {
  players.splice(index, 1);
  displayPlayers();
}

function createTeam() {
  const teamDisplay = document.getElementById("teamDisplay");
  teamDisplay.innerHTML = "";

  if (players.length < 11) {
    alert(
      "A cricket team needs at least 11 players. Add more players to create a team."
    );
    return;
  }

  const shuffledPlayers = shuffleArray(players);
  const teamDiv = document.createElement("div");
  teamDiv.innerHTML = "<h2>Selected Team:</h2>";

  shuffledPlayers.forEach((player, index) => {
    const playerDiv = createPlayerDiv(player, index);
    teamDiv.appendChild(playerDiv);
  });

  teamDisplay.appendChild(teamDiv);
}

function getPlayerPositionName(position) {
  switch (position) {
    case "bat":
      return "Bat";
    case "bowl":
      return "Bowl";
    case "wc":
      return "Wc";

    case "ar":
      return "all-round";
    default:
      return "Unknown";
  }
}

function shuffleArray(array) {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}
// ... (existing code)

function downloadTeam() {
  if (players.length < 11) {
    alert('A cricket team needs at least 11 players. Add more players to create a team.');
    return;
  }

  const teamText = generateTeamText();
  const blob = new Blob([teamText], { type: 'text/plain' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'selected_team.txt';
  link.click();
}

function generateTeamText() {
  const teamInfo = players.map(player => `${player.name} (#${player.jerseyNumber}) - ${getPlayerPositionName(player.position)}`);
  return teamInfo.join('\n');
}

// ... (existing code)
