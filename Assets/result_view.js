$(function(){

    // SAMPLE STUDENT + RESULT DATA (Replace with real saved data)
    let results = JSON.parse(localStorage.getItem("studentResults")) || [];

    function loadResults(filter="") {
        filter = filter.toLowerCase();
        $("#resultContainer").empty();

        results.forEach(st => {

            let fullName = (st.first + " " + st.last).toLowerCase();

            if(
                fullName.includes(filter) ||
                st.class.includes(filter) ||
                st.roll.includes(filter)
            ) {
                $("#resultContainer").append(`
                    <div class="col-md-4">
                        <div class="result-card">

                            <h5 class="result-title">${st.first} ${st.last}</h5>
                            <p>Class: <strong>${st.class}</strong> | Roll: <strong>${st.roll}</strong></p>

                            <hr>

                            <table class="result-table">
                                <tr><td>Bangla:</td><td>${st.result.ban}</td></tr>
                                <tr><td>English:</td><td>${st.result.eng}</td></tr>
                                <tr><td>Math:</td><td>${st.result.math}</td></tr>
                                <tr><td>Science:</td><td>${st.result.sci}</td></tr>
                                <tr><td>ICT:</td><td>${st.result.ict}</td></tr>
                                <tr><td>Religion:</td><td>${st.result.rel}</td></tr>
                                <tr><td>Social Science:</td><td>${st.result.ssc}</td></tr>
                            </table>

                            <hr>

                            <p><strong>Total:</strong> ${st.result.total}</p>
                            <p><strong>GPA:</strong> ${st.result.gpa}</p>
                            <span class="result-badge">${st.result.grade}</span>

                        </div>
                    </div>
                `);
            }
        });

        if($("#resultContainer").children().length === 0){
            $("#resultContainer").html(`<p class='text-center text-light'>No results found.</p>`);
        }
    }

    loadResults();

    // SEARCH
    $("#searchResult").on("keyup", function(){
        loadResults($(this).val());
    });

});
