const tbodyEl = document.querySelector("tbody");
    const tableEl = document.querySelector("table");
    const searchInput = document.getElementById("searchInput");


    window.addEventListener("load", () => {
      const savedData = JSON.parse(localStorage.getItem("userData"));
      if (savedData) {
        savedData.forEach(data => addTableRow(data));
      }
    });


    function addTableRow(data) {
      const tr = document.createElement("tr");
      tr.innerHTML = `
    <td>${data.studentID}</td>
    <td>${data.fullName}</td>
    <td>${data.schoolYear}</td>
    <td>${data.learnerRefNumber}</td>
    <td>
      <select class="remarks" onchange="changeBgColor(this)">
        <option value="released" ${data.remarks === "released" ? "selected" : ""}>Released</option>
        <option value="pending" ${data.remarks === "pending" ? "selected" : ""}>Pending</option>
        <option value="unreleased" ${data.remarks === "unreleased" ? "selected" : ""}>Unreleased</option>
      </select>
    </td>
    <td><button class="deleteBtn">Delete</button></td>
  `;
      tbodyEl.appendChild(tr);


      const remarksCell = tr.querySelector("td:nth-child(5)");
      setBgColor(remarksCell, data.remarks);


      const selectEl = tr.querySelector("select.remarks");
      selectEl.addEventListener("change", function () {
        const rowIndex = Array.from(tr.parentNode.children).indexOf(tr);
        updateLocalStorageRemarks(rowIndex, this.value);
        setBgColor(remarksCell, this.value);
      });
    }


    function updateLocalStorageRemarks(rowIndex, remarks) {
      const savedData = JSON.parse(localStorage.getItem("userData"));
      savedData[rowIndex].remarks = remarks;
      localStorage.setItem("userData", JSON.stringify(savedData));
    }


    function saveToLocalStorage() {
      const data = [];
      const rows = tbodyEl.querySelectorAll("tr");
      rows.forEach(row => {
        const studentID = row.querySelector("td:nth-child(1)").textContent;
        const fullName = row.querySelector("td:nth-child(2)").textContent;
        const schoolYear = row.querySelector("td:nth-child(3)").textContent;
        const learnerRefNumber = row.querySelector("td:nth-child(4)").textContent;
        const remarks = row.querySelector("select.remarks").value;
        data.push({
          studentID,
          fullName,
          schoolYear,
          learnerRefNumber,
          remarks
        });
      });
      localStorage.setItem("userData", JSON.stringify(data));
    }


    function onDeleteRow(e) {
      if (!e.target.classList.contains("deleteBtn")) {
        return;
      }
      const btn = e.target;
      const row = btn.closest("tr");
      const confirmation = confirm("Are you sure you want to delete?");
      if (confirmation) {
        row.remove();
        saveToLocalStorage();
      }
    }


    function sortTable(n) {
      let table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
      table = document.getElementById("userTable");
      switching = true;
      dir = "asc";

      while (switching) {
        switching = false;
        rows = table.rows;

        for (i = 1; i < rows.length - 1; i++) {
          shouldSwitch = false;
          x = rows[i].getElementsByTagName("td")[n];
          y = rows[i + 1].getElementsByTagName("td")[n];

          if (dir === "asc") {
            if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
              shouldSwitch = true;
              break;
            }
          } else if (dir === "desc") {
            if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
              shouldSwitch = true;
              break;
            }
          }
        }
        if (shouldSwitch) {
          rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
          switching = true;
          switchcount++;
        } else {
          if (switchcount === 0 && dir === "asc") {
            dir = "desc";
            switching = true;
          }
        }
      }
    }


    document.getElementById("registrationForm").addEventListener("submit", function (e) {
      e.preventDefault();
      const formData = new FormData(e.target);
      const data = Object.fromEntries(formData.entries());
      addTableRow(data);
      saveToLocalStorage();
      e.target.reset();
    });

    tableEl.addEventListener("click", onDeleteRow);
    tableEl.addEventListener("click", function (e) {
      if (e.target.tagName === "TH") {
        const index = Array.from(e.target.parentNode.children).indexOf(e.target);
        sortTable(index);
      }
    });


    function filterTable() {
      const searchText = searchInput.value.toLowerCase();
      const rows = tbodyEl.querySelectorAll("tr");

      rows.forEach(row => {
        const name = row.querySelector("td").textContent.toLowerCase();
        if (name.includes(searchText)) {
          row.style.display = "";
        } else {
          row.style.display = "none";
        }
      });
    }


    searchInput.addEventListener("input", filterTable);


    function changeBgColor(select) {
      const remarksCell = select.parentElement;
      setBgColor(remarksCell, select.value);
    }


    function setBgColor(cell, remarks) {
      if (remarks === "released") {
        cell.style.backgroundColor = "#058B1C";
      } else if (remarks === "pending") {
        cell.style.backgroundColor = "#E1A61D";
      } else {
        cell.style.backgroundColor = "";
      }
    }

    function help() {
      alert("Need some help? please send us a Email on kgarcia.k12257313@umak.edu.ph about your concern and we will get back to you after 24hrs. Thank you.");
    }































