let data = {

  "Hémogramme": [
    { "nom": "Globules rouges",
      "homme" :{"min":4.5, "max" : 5.7},
      "femme" :{"min":4.2, "max" : 5.2},
      "enfant" :{"min":3.9,"max" : 5.3},
      "unite": "T/L" },

    { "nom": "Hémoglobine",
      "homme" :{"min":13, "max" : 17},
      "femme" :{"min":12, "max" : 16},
      "enfant" :{"min":11, "max" : 15},
      "unite": "g/dL" },
  
    { "nom": "Hématocrite",
      "homme" :{"min":40, "max" : 52},
      "femme" :{"min":37, "max" : 47},
      "enfant" :{"min":33, "max" : 45},     
      "unite": "%" },

    { "nom": "Globules blancs",
      "homme" :{"min":4.0, "max" : 10.0},
      "femme" :{"min":4.0, "max" : 10.0},
      "enfant" :{"min":4.0,"max" : 10.0},
      "unite": "G/L" },

    { "nom": "PN", 
      "homme" :{"min": 40, "max": 70},
      "femme" :{"min": 40, "max": 70},
      "enfant" :{"min": 30, "max": 55},
      "unite": "%" },

    { "nom": "PE", 
      "homme" :{"min": 0, "max": 3},
      "femme" :{"min": 0, "max": 3},
      "enfant" :{"min": 1, "max": 5},
      "unite": "%" },

    { "nom": "PB", 
      "homme" :{"min": 0, "max": 0.5},
      "femme" :{"min": 0, "max": 0.5},
      "enfant" :{"min": 0, "max": 1},
      "unite": "%" },

    { "nom": "Lymphocyte", 
      "homme" :{"min": 20, "max": 40},
      "femme" :{"min": 20, "max": 40},
      "enfant" :{"min": 40, "max": 60},
      "unite": "%" },

    { "nom": "Monocyte", 
      "homme" :{"min": 2, "max": 10},
      "femme" :{"min": 2, "max": 10},
      "enfant" :{"min": 2, "max": 10},
      "unite": "%" },

    { "nom": "Plaquettes",
      "homme" :{"min": 150, "max": 450},
      "femme" :{"min": 150, "max": 450},
      "enfant" :{"min": 150, "max": 450},
      "unite": "G/L" }
  ],
  "Sérologie": [
    { "nom": "HIV", "min": 0, "max": 0, "unite": "" },
    { "nom": "Hépatite B", "min": 0, "max": 0, "unite": "" },
    { "nom": "Hépatite C", "min": 0, "max": 0, "unite": "" },
    { "nom": "Widal&Felix-TO", "min": 0, "max": 0, "unite": "" },
    { "nom": "Widal&Felix-TH", "min": 0, "max": 0, "unite": "" },
    { "nom": "RPR", "min": 0, "max": 0, "unite": "" },
    { "nom": "TPHA", "min": 0, "max": 0, "unite": "" },
    { "nom": "CRP", "min": 0, "max": 6, "unite": "mg/L" ,"type":"inferieur" },
    { "nom": "ASLO","min": 0, "max" : 200, "unite" : "UI/L","type":"inferieur" }
  ],
  
    "Biochimie": [
      { "nom": "Glycémie", min: 0.7, max: 1.1, unite: "g/L" },
      { "nom": "Urée", "min": 0.15, "max": 0.45, "unite": "g/L" },
      { "nom": "Créatinine", "min": 6, "max": 12, "unite": "mg/L" },
      { "nom": "Acide urique", "min": 25, "max": 70, "unite": "mg/L" },
      { "nom": "Cholestérol total", "min": 1.5, "max": 2.0, "unite": "g/L" },
      { "nom": "Triglycérides", "min": 0.5, "max": 1.5, "unite": "g/L" },
      { "nom": "ASAT", "min": 5, "max": 40, "unite": "UI/L" },
      { "nom": "ALAT", "min": 5, "max": 40, "unite": "UI/L" }
    ],
  
    "Parasitologie": [
      { "nom": "GE/FM", "min": 0, "max": 0, "unite": "", "options":["P.f","P.m","P.v","P.o"] },
      { "nom": "KAOP", "min": 0, "max": 0, "unite": "" },
      { "nom": "Bilharziose urinaire", "min": 0, "max": 0, "unite": "" ,"options":["Schistosoma haematobium"]}
    ],
  };

  const kaopOptions = {
    Kyste :["Entamoeba coli","Entamoeba histolytica","Giardia intestinalis"],
    Amibe: ["Entamoeba coli","Entamoeba histolytica","Giardia intestinalis","trichomonas intestinalis"],
    Oeuf: ["Oeuf d'Ascaris","Oeuf de Trichocéphale","Oeuf d'Ankylostome","Oeuf de Tænia","Oeuf de Schistosoma monsoni","Oeuf d'oxyure","Oeuf d'Anguillule"],
    Parasite : ["Présence de Ver adulte"," présence de segment de Tænia","Trichomonas"],
    Larve :["larve d'Anguillule" , "Larve d'Ankylostome"]
  };

  const today = new Date().toISOString().split("T")[0];
  document.getElementById("dateInput").value=today;

  
  function afficher() {

    let tbody = document.getElementById("tbody");
    let paraContainer = document.getElementById("parasitologie-container");
  
    // Nettoyage
    tbody.innerHTML = "";
    paraContainer.innerHTML = "";
  
    let sexe = document.getElementById("sexe").value;
    let age = parseInt(document.getElementById("age").value);
  
    let checkboxes = document.querySelectorAll("input[type=checkbox]:checked");
  
    checkboxes.forEach(cb => {
  
      let domaine = cb.value;

      if(!data[domaine])return;
  // 🔴 CAS PARASITOLOGIE
if (domaine === "Parasitologie") {

  let titre = document.createElement("h4");
  titre.textContent = domaine;
  titre.style.background = "#f0cf17c4";
  titre.style.color = "black";
  titre.style.fontWeight ="bold";
  titre.style.textAlign ="center";
  titre.style.padding = "8px";

  paraContainer.appendChild(titre);

  let table = document.createElement("table");
  table.border = "1";
  table.width = "100%";


  table.innerHTML = `
    <thead>
      <tr style="background:#28a745;color:white;">
        <th>Analyse</th>
        <th>Résultat</th>
        <th>Détails</th>
      </tr>
    </thead>
    <tbody></tbody>
  `;

  let tbodyPara = table.querySelector("tbody");

  data[domaine].forEach(item => {

    let tr = document.createElement("tr");

    // =========================
    // 🔥 CAS KAOP SPECIAL
    // =========================
    if (item.nom === "KAOP") {

      tr.innerHTML = `
        <td>${item.nom}</td>

        <td>
          
          <select onchange="toggleKAOP(this);verifierSelect(this)">
            <option value="">--Choisir--</option>
            <option value="negatif">Négatif</option>
            <option value="positif">Positif</option>
          </select> <br>
          
          <label> Aspect du selles: </label>
          <input type = "texte" class ="aspect-selle" placeholder = "Aspect du selle">
          
        </td>

        <td>
          <div style="display:flex; flex-direction:column; gap:5px;">

            <!-- TYPE -->
            <select multiple style="display:none;" onchange="updateSousGroupe(this)">
              <option value="Amibe">Amibe</option>
              <option value="Oeuf">Oeuf</option>
              <option value="Kyste">Kyste</option>
              <option value="Parasite">Parasite</option>
              <option value="Larve">Larve</option>
            </select>

            <!-- SOUS GROUPE -->

            <div class="kaop-list"></div>
            <select multiple style="display:none;"></select>
          
          </div>
        </td>
      `;
    }

    // =========================
    // 🔥 AUTRES (Paludisme etc)
    // =========================
    else {

      let optionsHTML = "";
      if (item.options) {
        optionsHTML = item.options.map(o => `<option>${o}</option>`).join("");
      }

    /*  tr.innerHTML = `
        <td>${item.nom}</td>

        <td>
          <select onchange="toggleParasiteTable(this);verifierSelect(this)">
            <option value="">--Choisir--</option>
            <option value="negatif">Négatif</option>
            <option value="positif">Positif</option>
          </select>
        </td>

        <td>
          <div style="display:flex; gap:5px;">

            <select style="display:none;">
              <option value="">--Parasite--</option>
              ${optionsHTML}
            </select>
            
            <input type="text" placeholder="Densité"
              style="display:none; width:80px;">

          </div>
        </td>
      `;*/

      let isPalu = item.nom === "GE/FM";

tr.innerHTML = `
  <td>${item.nom}</td>

  <td>
    <select onchange="toggleParasiteTable(this);verifierSelect(this)">
      <option value="">--Choisir--</option>
      <option value="negatif">Négatif</option>
      <option value="positif">Positif</option>
    </select>
  </td>

  <td>
    <div style="display:flex; gap:5px; align-items:center;">

      <select style="display:none;">
        <option value="">--Parasite--</option>
        ${optionsHTML}
      </select>

      ${
        isPalu
        ? `<span style="display:none;" class="dp-label">DP</span>
           <input type="text" style="display:none; width:60px;" class="density-input">
           <span style="display:none;" class="unit-label">P/uL</span>`
        : `<input type="text" placeholder="Densité"
             style="display:none; width:100px;">`
      }

    </div>
  </td>
`;

    }

    tbodyPara.appendChild(tr);
  });

  paraContainer.appendChild(table);
  return;

}

      // =========================
      // 🟢 DOMAINE NORMAL
      // =========================
  
      // 🔹 TITRE DOMAINE
      let trTitle = document.createElement("tr");
      trTitle.innerHTML = `
        <td colspan="4" class="domaine-${domaine}">
          ${domaine}
        </td>
      `;
      tbody.appendChild(trTitle);
  
      // 🔹 DATA
      data[domaine].forEach(item => {
  
        let ref = null;
  
        if (age < 15 && item.enfant) {
          ref = item.enfant;
        }
        else if (item[sexe]) {
          ref = item[sexe];
        }
        else if (item.min !== undefined && item.max !== undefined) {
          ref = item;
        }
        else {
          return;
        }
  
        let tr = document.createElement("tr");
  
        let isQualitatif = (ref.min === 0 && ref.max === 0);
  
        let inputField = "";
        let normalText = "";
  
        if (isQualitatif) {
          inputField = `
            <select onchange="verifierSelect(this)">
              <option value="">--Choisir--</option>
              <option value="negatif" >Négatif</option>
              <option value="positif">Positif</option>
            </select>
          `;
          normalText = "Négatif";
        } else {
          inputField = `
            <input type="number"
              oninput="verifierInput(this, ${ref.min},${ref.max},'${item.type|| "interval"}')">
          `;

          if(item.type === "inferieur"){
            normalText = `< ${ref.max}`;
          } else {
            normalText = `${ref.min} - ${ref.max}`;
          }
        }

  
        tr.innerHTML = `
          <td>${item.nom}</td>
          <td>${inputField}</td>
          <td>${normalText}</td>
          <td>${item.unite}</td>
        `;
  
        tbody.appendChild(tr);
  
      });
  
    });

    // GROUPAGE SANGUIN
    let groupage = document.getElementById("groupageCheck").checked;
      document.getElementById("groupage-container").style.display = groupage?"block":"none";
     console.log(document.getElementById("groupageCheck"));

  
  }
  

  // NORMAL / ANORMAL
  function verifierInput(input, min, max, type = "interval") {

    let val = parseFloat(input.value);
    min = parseFloat(min);
    max = parseFloat(max);
    if (isNaN(val)) return;
    
    // CAS CRP & ASLO 
    if(type === "inferieur"){
      if(val < max){
        input.style.color = "blue";
        input.style.fontWeight ="bold";
      } else {
        input.style.color = "red";
        input.style.fontWeight = "bold";
      }
    } else {
       if (val >= min && val <= max) {
      input.style.color = "blue";
      input.style.fontWeight = "bold";
    } else {
      input.style.color = "red";
      input.style.fontWeight = "bold";
    }
    }
      console.log(type,val,max);
  }
  

// NEGATIF / POSITIF


function verifierSelect(select) {

  if (select.value === "negatif" ) {
    select.style.color = "blue";
    select.style.fontWeight = "bold";
  } else if (select.value === "positif") {
    select.style.color = "red";      
    select.style.fontWeight = "bold";
  }
}

// GROUPAGE SELECTION

function colorGroupage(){

  let groupe = document.getElementById("groupe");
  let rhesus = document.getElementById("rhesus");

  if (groupe.value !==""){
    groupe.style.color ="red";
    groupe.style.fontWeight = "bold";
    groupe.style.fontSize = "16px";
  } else {
    groupe.style.color = "black";
  }

  if (rhesus.value !==""){
    rhesus.style.color ="red";
    rhesus.style.fontWeight = "bold";
    rhesus.style.fontSize = "16px";
  } else {
    rhesus.style.color = "black";
  }

}
// RECHERCHE PARASITE 

// =========================
// 🔄 TOGGLE PARASITOLOGIE
// =========================
function toggleParasiteTable(select) {

  let tr = select.closest("tr");
  let container = select.parentElement.nextElementSibling.querySelector("div");

  let parasiteSelect = container.querySelector("select");
  let densityInput = container.querySelector("input");
  let dpLabel = container.querySelector(".dp-label");
  let unitLabel =container.querySelector(".unit-label");

  if (select.value === "positif") {

    parasiteSelect.style.display = "block";
    parasiteSelect.style.color ="red";
    parasiteSelect.style.fontWeight = "bold";
    densityInput.style.display = "block";
    densityInput.style.color = "red";
    densityInput.style.fontWeight = "bold";

    if(dpLabel)dpLabel.style.display ="block";
    if(unitLabel)unitLabel.style.display ="block";
    if(densityInput)densityInput.style.display ="block";

    // mbola tsy valid raha tsy feno
    if (parasiteSelect.value !== "" && densityInput.value !== "") {
      tr.classList.add("filled");
    } else {
      tr.classList.remove("filled");
    }

  } 
  else if (select.value === "negatif") {

    parasiteSelect.style.display = "none";
    parasiteSelect.style.color ="blue";
    parasiteSelect.style.fontWeight = "bold"
    densityInput.style.display = "none";
    densityInput.style.color = "blue";
    densityInput.style.fontWeight = "bold";


    parasiteSelect.value = "";
    densityInput.value = "";

    tr.classList.add("filled"); // négatif = valid

  } 
  else {

    parasiteSelect.style.display = "none";
    densityInput.style.display = "none";

    if(dpLabel)dpLabel.style.display ="none";
    if(unitLabel)unitLabel.style.display ="none";
    if(densityInput)densityInput.style.display ="none";

    parasiteSelect.value = "";
    densityInput.value = "";

    tr.classList.remove("filled");
  }

  // rehefa miova parasite
  parasiteSelect.onchange = function () {
    if (parasiteSelect.value !== "" && densityInput.value !== "") {
      tr.classList.add("filled");
    } else {
      tr.classList.remove("filled");
    }
  };

  // rehefa miova densité
  densityInput.oninput = function () {
    if (parasiteSelect.value !== "" && densityInput.value !== "") {
      tr.classList.add("filled");
    } else {
      tr.classList.remove("filled");
    }
  };

}


// TOGGLE KAOP 

function toggleKAOP(select) {

  let tr = select.closest("tr");
  let container = tr.querySelector("div");

  let typeSelect = container.querySelectorAll("select")[0];
  let sousSelect = container.querySelectorAll("select")[1];

  if (select.value === "positif") {

    typeSelect.style.display = "block";

    /*typeSelect.onchange = function(){
      Array.from(typeSelect.options).forEach(opt => {
      opt.style.color = opt.selected?"red" : "black";
    });
    };

    sousSelect.onchange = function(){
        Array.from(sousSelect.options).forEach(opt => {
      opt.style.color = opt.selected?"red" : "black";
    });
    }; */

    if (sousSelect.selectedOptions.length > 0) {
      tr.classList.add("filled");
    } else {
      tr.classList.remove("filled");
    }

  } 
  else if (select.value === "negatif") {

    typeSelect.style.display = "none";
    sousSelect.style.display = "none";

    typeSelect.selectedIndex = -1;
    sousSelect.innerHTML = "";

    tr.classList.add("filled");

  } 
  else {

    typeSelect.style.display = "none";
    sousSelect.style.display = "none";
    tr.classList.remove("filled");
  }

  sousSelect.onchange = function () {
    if (sousSelect.selectedOptions.length > 0) {
      tr.classList.add("filled");
    } else {
      tr.classList.remove("filled");
    }
  };

}

// KAOP SOUS GROUP

/*function updateSousGroupe(select) {

  let container = select.parentElement;
  let sousSelect = container.querySelectorAll("select")[1];

  sousSelect.innerHTML = "";

  let selected = Array.from(select.selectedOptions).map(o => o.value);

  selected.forEach(type => {
    kaopOptions[type].forEach(s => {
      let opt = document.createElement("option");
      opt.textContent = s;
      opt.value = s;
      sousSelect.appendChild(opt);
    });
  });

  sousSelect.style.display = selected.length ? "block" : "none";
} 
*/

function updateSousGroupe(select) {

  let container = select.parentElement;

  // toerana ametrahana liste
  let zone = container.querySelector(".kaop-liste");

  if(!zone){
    zone = document.createElement("div");
    zone.className = "kaop-liste";
    container.appendChild(zone);
  }

  zone.innerHTML = "";

  let selected = Array.from(select.selectedOptions).map(o => o.value);


  selected.forEach(type => {

    kaopOptions[type].forEach(s => {

      let ligne = document.createElement("div");

      ligne.style.display = "flex";
      ligne.style.gap = "5px";
      ligne.style.alignItems = "center";


      ligne.innerHTML = `
      <select class="abondance-kaop" style="display: none;">
         <option value="">--Abondance--</option>
         <option value="Rare">Rare</option>
         <option value="Quelques">Quelques</option>
           <option value="Nombreux">Nombreux</option>
      </select>
      <input type="checkbox"
        class="sous-kaop" value ="${s}"> 
        <span>${s}</span>
        
      `;

      zone.appendChild(ligne);

      let check = ligne.querySelector(".sous-kaop");
      let abondance = ligne.querySelector(".abondance-kaop");

      check.onchange = function(){
        abondance.style.display = check.checked ? "block" : "none";
      }

    });

  });

}


  // PDF (simple)
  

  function exportPDF() {

    document.getElementById("v-labo").innerHTML = document.getElementById("labo").value;
    document.getElementById("v-date").innerHTML = document.getElementById("dateInput").value;
    document.getElementById("v-nom").innerHTML = document.getElementById("nom").value;
    document.getElementById("v-prenom").innerHTML = document.getElementById("prenom").value;

    let date = document.querySelector('input[type="date"]').value;

    if(date){
      let [annee, mois, jour] = date.split("-");
      document.getElementById("v-date").innerHTML = jour + "/" + mois + "/" + annee;
    }
    

    let rows = document.querySelectorAll("#tbody tr");
  
    rows.forEach(row => {
  
      let input = row.querySelector("input");
      let select = row.querySelector("select");
  
      let vide = false;
  
      // INPUT VIDE
      if (input && input.value.trim() === "") {
        vide = true;
      }
  
      // SELECT TSY VOAFIDY (--Choisir--)
      if (select && (select.value === "" || select.value === "--Choisir--")) {
        vide = true;
      }
  
      // HIDE
      if (vide) {
        row.style.display = "none";
      } 
  
    });
    
    let paraRows = document.querySelectorAll("#parasitologie-container tbody tr");

    paraRows.forEach(tr => {
    
      let selects = tr.querySelectorAll("select");
      let inputs = tr.querySelectorAll("input");
    
      let result = selects[0]?.value;
    
      // KAOP (3 select)
    if ( selects.length >= 3) {

      let type = selects[1];
      let sous = selects[2];

      if(!result) {
        tr.style.display = "none";
        return;
      }

      if (result === "positif"){

        let zone = tr.querySelector(".kaop-liste");

        if(!zone || zone.innerHTML.trim() === ""){
          tr.style.display = "none";
          return;
        }

          // Affichage détails KAOP amin'ny PDF

   if(zone){

    let texte = "";

    zone.querySelectorAll("div").forEach(div => {
    
      let check = div.querySelector(".sous-kaop");
      let label = div.querySelector("span")?.textContent;
      let abondance = div.querySelector(".abondance-kaop")?.value;

      if(check && check.checked){
        if(abondance){
          texte = abondance + " ";
        }
        texte += label;
        texte += "<br>";
      }

    });

    tr.querySelector("td:nth-child(3)").innerHTML = texte;
  }

        if(type){
          type.style.display = "none";
        }

       if(type && type.options){
        Array.from(type.options).forEach(opt => {
          if(!opt.selected)opt.remove();
        });
       }

       if(sous && sous.options){
         Array.from(sous.options).forEach(opt => {
          if(!opt.selected)opt.remove();
        });
       }



      }
    }
      // AUTRES
      else {
    
        let parasite = selects[1]?.value;
        let density = inputs[0]?.value;
    
        if (!result) {
          tr.style.display = "none";
          return;
        }
    
        if (result === "positif" && (!parasite || !density)) {
          tr.style.display = "none";
          return;
        }
      }
    
      tr.style.display = "";
    });

    let table = document.getElementById("table1");
    let thead = table.querySelector("thead");
    let bodyRows = table.querySelectorAll("#tbody tr");

    let hasVisibleRow = false;

    bodyRows.forEach(row => {
      if(row.style.display !== "none"){
        hasVisibleRow = true;
      }
    });

    if (!hasVisibleRow) {
      thead.style.display = "none";
    } else {
      thead.style.display = "";
    }

    let groupe = document.getElementById("groupe").value;
    let rhesus = document.getElementById("rhesus").value;

    if(!groupe || !rhesus){
      document.getElementById("groupage-container").classList.add("hide-print");
    }

    setTimeout(()=>{
      window.print();
    },300);
  
    // RELOAD PAGE (mamerina affichage)
    window.onafterprint = () => {
      //location.reload();
      let rows = document.querySelectorAll("#table1 tr");
      rows.forEach(row => {
        row.style.display = "";
      });

      let paraRows = document.querySelectorAll("#parasitologie-container tbody tr");
      paraRows.forEach(tr => {
        tr.style.display ="";
      });

      document.querySelectorAll("#parasitologie-container select").forEach(s => {
        s.style.display ="";
      });

      document.getElementById("groupage-container").classList.remove("hide-print");
    };
  }
  
  
