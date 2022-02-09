(async () => {
    if (window.location.pathname.includes("grades")) {
        const karakterView = await first("#s_m_Content_Content_karakterView_KarakterGV");
        const karakterTable = karakterView.querySelectorAll("tbody tr td:nth-child(3) div")
        const karakterer = [];
        for (const karakter of karakterTable) {
            if (karakter.title == "") continue;
            const vægt = karakter.title.match(/[\d,]+/g)[1];
            const karakterTal = karakter.innerText
            karakterer.push([parseFloat(vægt.replace(",", ".")), parseInt(karakterTal)]);
        }
        // Get weighted grade
        let sum = 0;
        let vægte = 0;
        for (const karakter of karakterer) {
            sum += karakter[0] * karakter[1];
            vægte += karakter[0];
        }
        const gennemsnit = sum / vægte;
        // add it to the bottom of the table
        
        const karakterRow = karakterView.querySelector("tbody tr:last-child");
        const clonedRow = karakterRow.cloneNode(true);
        clonedRow.querySelector("td:nth-child(2)").innerText = "Gennemsnit";
        clonedRow.querySelector("td:nth-child(1) span").innerText = ""
        clonedRow.querySelector("td:nth-child(3) div").innerText = gennemsnit.toFixed(2);
        clonedRow.querySelector("td:nth-child(3) div").title = "Vægtet gennemsnit";
        karakterRow.parentElement.appendChild(clonedRow);

        const karakterTopRow = karakterView.querySelector("tbody tr:nth-child(1) th:last-child");
        const clonedTopRow = karakterTopRow.cloneNode(true);
        clonedTopRow.innerText = "Vægt";
        karakterTopRow.parentElement.appendChild(clonedTopRow);

        let counter = 2
        for (const karakter of karakterer) {
            const vægtCol = karakterView.querySelector("tbody tr:nth-child(" + counter + ") td:last-child");
            const clonedVægtCol = vægtCol.cloneNode(true);
            clonedVægtCol.innerText = karakter[0];
            vægtCol.parentElement.appendChild(clonedVægtCol);
            counter++;
        }
        
    }
})()