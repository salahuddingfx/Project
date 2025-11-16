$(document).ready(function () {

    let students = JSON.parse(localStorage.getItem("students")) || [];

    function loadResults(filter = "") {
        filter = filter.toLowerCase();
        $("#resultContainer").empty();

        let found = false;

        students.forEach((s) => {

            // Skip if no result saved
            if (!s.result || !s.result.grade) return;

            let fullName = (s.first + " " + s.last).toLowerCase();

            if (
                fullName.includes(filter) ||
                s.class.toLowerCase().includes(filter) ||
                s.roll.toLowerCase().includes(filter)
            ) {
                found = true;

                $("#resultContainer").append(`

                <div class="col-md-4 result-wrapper">
                    <div class="result-card">

                        <h5 class="result-title">${s.first} ${s.last}</h5>

                        <p><strong>Class:</strong> ${s.class}</p>
                        <p><strong>Roll:</strong> ${s.roll}</p>

                        <p><strong>Total Marks:</strong> ${s.result.total}</p>
                        <p><strong>GPA:</strong> ${s.result.gpa}</p>

                        <span class="result-badge">${s.result.grade}</span>

                        <hr>

                        <p class="subject-line">
                            <span>Bangla</span>
                            <span>${s.result.sub_ban}</span>
                        </p>
                        <div class="progress mb-2">
                            <div class="progress-bar" style="width:${s.result.sub_ban}%"></div>
                        </div>

                        <p class="subject-line">
                            <span>English</span>
                            <span>${s.result.sub_eng}</span>
                        </p>
                        <div class="progress mb-2">
                            <div class="progress-bar" style="width:${s.result.sub_eng}%"></div>
                        </div>

                        <p class="subject-line">
                            <span>Math</span>
                            <span>${s.result.sub_math}</span>
                        </p>
                        <div class="progress mb-2">
                            <div class="progress-bar" style="width:${s.result.sub_math}%"></div>
                        </div>

                        <p class="subject-line">
                            <span>Science</span>
                            <span>${s.result.sub_sci}</span>
                        </p>
                        <div class="progress mb-2">
                            <div class="progress-bar" style="width:${s.result.sub_sci}%"></div>
                        </div>

                        <p class="subject-line">
                            <span>ICT</span>
                            <span>${s.result.sub_ict}</span>
                        </p>
                        <div class="progress mb-2">
                            <div class="progress-bar" style="width:${s.result.sub_ict}%"></div>
                        </div>

                        <p class="subject-line">
                            <span>Religion</span>
                            <span>${s.result.sub_rel}</span>
                        </p>
                        <div class="progress mb-2">
                            <div class="progress-bar" style="width:${s.result.sub_rel}%"></div>
                        </div>

                        <p class="subject-line">
                            <span>Social Science</span>
                            <span>${s.result.sub_ssc}</span>
                        </p>
                        <div class="progress mb-2">
                            <div class="progress-bar" style="width:${s.result.sub_ssc}%"></div>
                        </div>

                    </div>
                </div>

                `);
            }
        });

        if (!found) {
            $("#resultContainer").html(`
                <h4 class="text-center text-muted">No results found...</h4>
            `);
        }
    }

    $("#searchResult").on("input", function () {
        loadResults($(this).val());
    });

    loadResults();
});
