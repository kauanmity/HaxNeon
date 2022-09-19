var slot = 16
var room = HBInit({
	roomName: "ㅤㅤㅤㅤㅤ🎩 HN [Futsal x3]⚽⭐ㅤㅤㅤㅤ",
	maxPlayers: 16,
	public: true,
	noPlayer: true // Remove host player (recommended!)
});
room.setScoreLimit(3);
room.setTimeLimit(3);
//PORTAS
//3000 = Central
//3001 = Futsal x3
//3002 = Futsal x4
//3003 = SpaceBounce


var sitedb = "http://localhost:"
var central = "3000"
var port = "3001"
var discord = "https://discord.gg/nGSdMpsbAV"

function mapasala(){
    fetch("https://raw.githubusercontent.com/kauanmity/HaxNeon/main/futsalx3.json?token=GHSAT0AAAAAABYEINV6ORH22G6E3ZCB2EBOYZHQE2Q")//ESTE URL É UM MAPA DE EXEMPLO
    .then(r => r.json()).then(d => room.setCustomStadium(JSON.stringify(d)))
    .catch(console.error);
}
mapasala()

function resetar_jsonserver(player){
    let reset_chat = 
    {   
    "nick": "",
    "online": "",
    }
    fetch('http://localhost:3001/chat', {
        method: 'PUT',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(reset_chat),
        })
        .then(response => response.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
            console.log('Success:', JSON.stringify(response))
    });
    let reset_online = 
    {   
    "slot": slot,
    "online": "0",
    }
    fetch('http://localhost:3001/online', {
        method: 'PUT',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(reset_online),
        })
        .then(response => response.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
            console.log('Success:', JSON.stringify(response))
    });

    let reset_entrada = 
    {   
        "nick": "",
        "auth": "",
        "conn": ""
    }
    fetch('http://localhost:3001/entrada', {
        method: 'PUT',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(reset_entrada),
        })
        .then(response => response.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
            console.log('Success:', JSON.stringify(response))
    });

    fetch('http://localhost:3001/saida', {
        method: 'PUT',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(reset_entrada),
        })
        .then(response => response.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
            console.log('Success:', JSON.stringify(response))
    });
}

room.onRoomLink = function(link) {
    let roomlink = 
    {   
    "link": link
    }

    fetch('http://localhost:3001/haxlink', {
        method: 'PUT',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(roomlink),
        })
        .then(response => response.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
            console.log('Success:', JSON.stringify(response))
    });
}
resetar_jsonserver()

function IP(str) {
    let hexString = str;
    let strOut = "";
    for (let x = 0; x < hexString.length; x += 2) {
      strOut += String.fromCharCode(parseInt(hexString.substr(x, 2), 16));
    }
    return strOut;
}
function timeout() {
    setTimeout(function () {
        fetch(`${sitedb}${port}/mensagemdiscord`)
        .then(response => response.json())
        .then(data => {
            if(data.discordname === ""){
                return false;
            }else{
            room.sendAnnouncement(data.discordname + ": " + data.discordmensagem, null, 0x660099, "bold", 2)
            let logdiscordchat = 
            {
                "discordname": "",
                "discordmensagem": ""
            }
        fetch(`${sitedb}${port}/mensagemdiscord`, {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(logdiscordchat),
        })}})
    }, 1000);
    setTimeout(function () {
        fetch(`${sitedb}${port}/kickeban`)
        .then(response => response.json())
        .then(data => {
            if(data.discordname === ""){
                return false;
            }else if(data.kickouban === "true"){
                room.kickPlayer(data.discordid, "DISCORD TAG [" + data.discordname + "]: " + data.discordmensagem, true)
                let logdiscordkick = 
                {
                    "discordname": "",
                    "discordmotivo": "",
                    "discordid": "",
                    "kickouban": ""
                }
                fetch(`${sitedb}${port}/kickeban`, {
                    method: 'PUT',
                    headers: {
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(logdiscordkick),
                })
            }else if(data.kickouban === "false"){
                room.kickPlayer(data.discordid, "DISCORD TAG [" + data.discordname + "]:" + data.discordmotivo, false)
                let logdiscordkick = 
                {
                    "discordname": "",
                    "discordmotivo": "",
                    "discordid": "",
                    "kickouban": ""
                }
                fetch(`${sitedb}${port}/kickeban`, {
                    method: 'PUT',
                    headers: {
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(logdiscordkick),
                })
            }})
            timeout();
        }, 1000)

}
timeout()

var naologados = new Map();
var naoregistrados = new Map();
function RegistrarDados(player){
    info = playerdata.get(player.id)
    fetch(`${sitedb}${central}/contas?nick=${player.name}`)
    .then(response => response.json())
    .then(data => {
        if(data.length === 0){
            
            setTimeout(function () {
                room.sendAnnouncement("🎩 HaxNeon ⚽⭐: Não foi encontrado nenhum registro com seu nick", player.id, 0xffff00, "bold", 2)
            },1000)
            setTimeout(function () {
                room.sendAnnouncement("🎩 HaxNeon ⚽⭐: Se registre pelo nosso Discord", player.id, 0xffff00, "bold", 2)
            },2000)
            setTimeout(function () {
                room.sendAnnouncement(`🎩 HaxNeon ⚽⭐: ${discord}`, player.id, 0xffff00, "bold", 2)
            },3000)
            naoregistrados.set(player.id, true)
        }
        if(data[0].conn === info.conn){
            if(data[0].cargo === "staff"){
                room.setPlayerAdmin(player.id, true)
            }
            setTimeout(function () {
                room.sendAnnouncement(`🎩 HaxNeon ⚽⭐: Bem - Vindo ${player.name}[${player.id}]`, player.id, 0x008000, "bold", 2)
            },1000)
            setTimeout(function () {
                room.sendAnnouncement(`🎩 HaxNeon ⚽⭐: Se divirta na nossa sala`, player.id, 0x008000, "bold", 2)
            },2000)
            setTimeout(function () {
                room.sendAnnouncement(`🎩 HaxNeon ⚽⭐: Mas se divirta com responsabilidade`, player.id, 0x008000, "bold", 2)
            },3000)
            setTimeout(function () {
                room.sendAnnouncement(`🎩 HaxNeon ⚽⭐: Seu IP: ${info.ip}`, player.id, 0x008000, "bold", 2)
            },4000)
            let log_player = 
                {
                "nick": info.name,
                "auth": info.auth,
                "conn": info.conn,
                "senha": data[0].senha,
                "discordID": data[0].discordID,
                "online": true,
                "ip": info.ip,
                "cargo": data[0].cargo,
                }
            fetch(`${sitedb}${central}/contas/${data[0].id}`, {
                method: 'PUT',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(log_player),
            })
        }
        else{
            setTimeout(function () {
                room.sendAnnouncement(`🎩 HaxNeon ⚽⭐: Logue ${player.name}[${player.id}]`, player.id, 0x008000, "bold", 2)
            },1000)
            setTimeout(function () {
                room.sendAnnouncement(`🎩 HaxNeon ⚽⭐: Seu IP: ${info.ip}`, player.id, 0x008000, "bold", 2)
            },2000)
            naologados.set(player.id, true)
            let log_player = 
                {
                "nick": info.name,
                "auth": info.auth,
                "conn": info.conn,
                "senha": data[0].senha,
                "discordID": data[0].discordID,
                "online": true,
                "ip": info.ip,
                "cargo": data[0].cargo,
                }
            fetch(`${sitedb}${central}/contas/${data[0].id}`, {
                method: 'PUT',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(log_player),
            })
        }
    })
}


var playerdata = new Map();
var cargos = new Map();

room.onPlayerJoin = function(player) {
    info = playerdata.get(player.id)
    var contagemdeplayer = room.getPlayerList().filter((player) => player.id != 0);
    function addPlayerData() {
		let playerData = {
			name: String(player.name),
			conn: String(player.conn),
			auth: String(player.auth),
			ip: IP(player.conn),
			id: String(player.id),
		};
		playerdata.set(player.id, playerData);
    }

    addPlayerData()

    RegistrarDados(player)
    
    let log_online = 
        {   
            "slot": slot,
            "online": contagemdeplayer.length,
        }

    fetch(`${sitedb}${port}/online`, {
        method: 'PUT',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(log_online),
    })
    .then(response => response.json())
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success:', JSON.stringify(response)));
    
    let log_entrada = 
        {   
            "nick": info.name,
            "auth": info.auth,
            "conn": info.conn
        }

    fetch(`${sitedb}${port}/entrada`, {
        method: 'PUT',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(log_entrada),
    })
    .then(response => response.json())
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success:', JSON.stringify(response)));
}

room.onPlayerLeave = function(player) {
    var contagemdeplayer = room.getPlayerList().filter((player) => player.id != 0);
    nlogados = naologados.get(player.id)
    nregistrados = naoregistrados.get(player.id)
    info = playerdata.get(player.id)

    if(!nlogados || nlogados && !nregistrados){
        fetch(`${sitedb}${central}/contas?nick=${player.name}`)
        .then(response => response.json())
        .then(data => {
            let log_player = 
                {
                "nick": info.name,
                "auth": info.auth,
                "conn": info.conn,
                "senha": data[0].senha,
                "discordID": data[0].discordID,
                "online": false,
                "ip": info.ip,
                "cargo": data[0].cargo,
                }
            playerdata.delete(player.id)
            naologados.delete(player.id)
            naoregistrados.delete(player.id)
            naologados.set(player.id, true)
            fetch(`${sitedb}${central}/contas/${data[0].id}`, {
                method: 'PUT',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(log_player),
            })
        })
    }
    
    let log_online = 
        {   
            "slot": slot,
            "online": contagemdeplayer.length,
        }

    fetch(`${sitedb}${port}/online`, {
        method: 'PUT',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(log_online),
    })
    .then(response => response.json())
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success:', JSON.stringify(response)));

    let log_saida = 
        {   
            "nick": info.name,
            "auth": info.auth,
            "conn": info.conn
        }

    fetch(`${sitedb}${port}/saida`, {
        method: 'PUT',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(log_saida),
    })
    .then(response => response.json())
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success:', JSON.stringify(response)));

}

room.onPlayerChat = function(player, message) {
    nlogados = naologados.get(player.id)
    nregistrados = naoregistrados.get(player.id)
    info = playerdata.get(player.id)
	msg = message.split(/ +/)
    

    if (nregistrados && !nlogados){
        room.sendAnnouncement("🎩 HaxNeon ⚽⭐: Se registre pelo nosso Discord", player.id, 0xffa500, "bold", 2)
        setTimeout(function () {
            room.sendAnnouncement(`🎩 HaxNeon ⚽⭐: ${discord}`, player.id, 0xffa500, "bold", 2)
        },1000)
        return false;
    }
    if (nlogados && !nregistrados){
        if (["!login"].includes(msg[0].toLowerCase()) ) {
            if (msg[2]){
                room.sendAnnouncement(`🎩 HaxNeon ⚽⭐: Não pode houver Espaçamento`, player.id, 0x008000, "bold", 2)
                return false;
            }
            fetch(`${sitedb}${central}/contas?nick=${player.name}`)
            .then(response => response.json())
            .then(data => {
                if(data[0].senha != msg[1]){
                    room.kickPlayer(player.id, "Senha incorreta", false);
                }else{
                    if(data[0].cargo === "staff"){
                        room.setPlayerAdmin(player.id, true)
                    }
                    room.sendAnnouncement(`🎩 HaxNeon ⚽⭐: Logou com sucesso ${player.name}[${player.id}]`, player.id, 0x008000, "bold", 2)
                    naologados.delete(player.id, true)
                    naoregistrados.delete(player.id, true)
                }
            })
            return false;
        }
        room.sendAnnouncement(`🎩 HaxNeon ⚽⭐: Logue ${player.name}[${player.id}]`, player.id, 0x008000, "bold", 2)
        return false;
    }
    if (!nregistrados && !nlogados){
        if (["!changepass"].includes(msg[0].toLowerCase()) ) {
            if (msg[2]){
                room.sendAnnouncement(`🎩 HaxNeon ⚽⭐: Não pode houver Espaçamento`, player.id, 0x008000, "bold", 2)
                return false;
            }
            fetch(`${sitedb}${central}/contas?nick=${player.name}`)
            .then(response => response.json())
            .then(data => {
                let log_player = 
                    {
                    "nick": info.name,
                    "auth": info.auth,
                    "conn": info.conn,
                    "senha": msg[1],
                    "discordID": data[0].discordID,
                    "online": true,
                    "ip": info.ip,
                    "cargo": data[0].cargo,
                    }
                fetch(`${sitedb}${central}/contas/${data[0].id}`, {
                    method: 'PUT',
                    headers: {
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(log_player),
                })
                .then(response => response.json())
                .catch(error => console.error('Error:', error))
                .then(response => console.log('Success:', JSON.stringify(response)))
                .then(response => room.sendAnnouncement(`Sua senha: ${msg[1]}`, player.id));
            })
            return false;
        }
    }
    let reset_chat = 
    {   
    "nick": info.name,
    "message": msg.join(" "),
    }
    if(!message.startsWith("!")){
        fetch(`${sitedb}${port}/chat`, {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(reset_chat),
            })
            .then(response => response.json())
            .catch(error => console.error('Error:', error))
            .then(response => {
                console.log('Success:', JSON.stringify(response))
        });
        console.log(player.name + ": " + message);
        
    }else{
        return false;
    }
}
