


// function changeColor(btn) {
//     btn.style.backgroundColor = "green";
//     btn.style.color = "white";
// }

const seats = [];

function changeColor(btn) {

    const seatno = btn.innerText;
    console.log(seatno);



    let fdate = document.getElementById("fdate").value;
    console.log(typeof fdate)



    if (fdate === "") {
        alert("plz selete the date")
        console.log("Plz selete the date")
    } else {

        if (btn.classList.contains("selected")) {
            btn.classList.remove("selected");
            btn.style.backgroundColor = "";
            btn.style.color = "";
            let index = seats.indexOf(seatno);
            if (index > -1) {
                seats.splice(index, 1);
                console.log(seats)
            }

        } else {
            btn.classList.add("selected")
            btn.style.backgroundColor = "green";
            btn.style.color = "white"

            seats.push(seatno);
            console.log(seats);

        }
    }




    // let fdate = new Date(fdata.toLocaleDateString());



    // let fdate = (parseInt(new Date(fdata).getDate())); 



    // axios.post("http://localhost:3000/moviebookingdetails", { mid: mid, tid: tid, seats: seats, time: time, today: today, fdate: fdate, mdate: mdate }).then((success) => {
    //     console.log(success);
    //     // console.log("Hello")
    // }).catch((error) => {
    //     console.log(error);
    // })
    // console.log("Hi");
}


const addData = (btnn) => {

    // console.log(typeof seats)
    // console.log(seats)

    if (seats.length === 0) {
        alert("plz selete the seat")
        console.log("plz selete the seat")
    } else {

        let valid = btnn.getAttribute("Isckicked");
        console.log(valid)
        if (valid === null) {

            btnn.setAttribute("Isckicked", "yes")

            var mid = btnn.getAttribute("data-app-mid");
            var tid = btnn.getAttribute("data-app-tid");
            console.log(mid);
            console.log(tid);

            let mname = document.getElementById("mname").innerText;
            console.log(mname)
            let time = document.getElementById("mtime").innerText;
            let endtime = document.getElementById("endtime").innerText;
            let duration = document.getElementById("mduration").innerText;
            console.log(endtime)
            console.log(duration)
            let today = new Date().getDate();
            let fdate = document.getElementById("fdate").value;
            let mdate = document.getElementById("mdate").innerText;
            let price = document.getElementById("mprice").innerText;
            let datetime = document.getElementById("datetime").innerText;
            console.log(datetime)


            let tname = document.getElementById("tname").innerText;
            let location = document.getElementById("location").innerText;
            console.log(tname)
            console.log(location)

            let totalprice = parseInt(price) * seats.length;
            console.log(totalprice)
            let uemail = document.getElementById("email").value;
            console.log(uemail)

            let cdt = new Date().toLocaleString('sv-SE').replace(' ', 'T').slice(0, 16);
            console.log(cdt)

            if (cdt < datetime) {
                axios.post("http://localhost:3000/moviebookingdetails", { mname: mname, mid: mid, tid: tid, seats: seats, time: time, today: today, fdate: fdate, mdate: mdate, endtime: endtime, duration: duration, tname: tname, location: location, totalprice: totalprice, datetime: datetime, useremail: uemail }).then((success) => {
                    console.log(success);
                    let id = success.data;
                    console.log(id)
                    window.location.href = `http://localhost:3000/showseatbookdata/?id=${id}`;
                    // console.log("Hello")
                }).catch((error) => {
                    console.log(error);
                })

            } else {
                alert("movie has pass time")
            }
            // console.log("Hi");
            alert("seat sava successfully!")
        } else {
            alert("you alredy clicked sava seat button  now you want to confirm the ticket plz click on next")
            console.log("plz click next to confiromation seat")
        }
    }

}

function printIt() {
    // window.print();

    let cardbody = document.getElementById("ticket").innerHTML;
    let odata = document.body.innerHTML;
    document.body.innerHTML = cardbody;
    window.print();

}

const setAlert = () => {
    alert("This seat is already booked plz select another seat")
}


const downloadPDF = () => {

    let ticket = document.getElementById("ticket");

    html2canvas(ticket).then((success) => {
            const imgData = success.toDataURL("image/png");

            const { jsPDF } = window.jspdf;

            const pdf = new jsPDF();

            pdf.addImage(imgData, 'PNG', 10, 10, 180, 100);

            pdf.save("ticket.pdf");

        }).catch((error) => {

          console.log("PDF Download Error :", error);

            alert("Something went wrong");

        });

}