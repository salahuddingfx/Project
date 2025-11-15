$(function(){

    // DEFAULT STUDENTS
    let students = [
        {firstName:"Salah Uddin", lastName:"Kader", className:"10", rollNo:"001", attendance:{}},
        {firstName:"Partha Protim", lastName:"Datta", className:"10", rollNo:"002", attendance:{}},
        {firstName:"Rafi Bin", lastName:"Nur", className:"10", rollNo:"003", attendance:{}}
    ];

    let selected = null;


    // ======================
    // LOAD STUDENT LIST
    // ======================
    function loadStudents(filter="") {

        filter = filter.toLowerCase();
        $("#studentCards").empty();

        students.forEach((s, i) => {

            let full = (s.firstName + " " + s.lastName).toLowerCase();
            let cls = s.className.toLowerCase();
            let roll = s.rollNo.toLowerCase();

            let match =
                full.includes(filter) ||
                s.firstName.toLowerCase().includes(filter) ||
                s.lastName.toLowerCase().includes(filter) ||
                cls.includes(filter) ||
                roll.includes(filter);

            if(match){
                $("#studentCards").append(`
                    <div class="list-group-item student-item" data-id="${i}">
                        ${s.firstName} ${s.lastName}
                        <br><small>Class ${s.className} | Roll ${s.rollNo}</small>
                    </div>
                `);
            }
        });
    }
    loadStudents();


    // SEARCH ACTION
    $("#searchStudent").on("keyup", function(){
        loadStudents($(this).val());
    });


    // ======================
    // SELECT STUDENT
    // ======================
    $(document).on("click", ".student-item", function(){
        $(".student-item").removeClass("active");
        $(this).addClass("active");

        selected = $(this).data("id");
        let s = students[selected];

        $("#selectedStudentName").text(s.firstName + " " + s.lastName);
        $("#detailClass").text(s.className);
        $("#detailRoll").text(s.rollNo);

        loadAttendance();
    });


    // ======================
    // LOAD ATTENDANCE LIST
    // ======================
    function loadAttendance(){
        $("#attendanceList").empty();

        if(selected === null) return;

        let s = students[selected];
        let total = 0, present = 0;

        for(let d in s.attendance){
            total++;
            if(s.attendance[d] === "Present") present++;

            $("#attendanceList").append(`
                <li class="list-group-item">${d} → ${s.attendance[d]}</li>
            `);
        }

        let percent = total ? Math.round((present/total)*100) : 0;
        $("#attendancePercent").text(percent + "%");
    }


    // ======================
    // MARK PRESENT / ABSENT
    // ======================
    function mark(type){

        if(selected === null) return alert("Select a student first!");

        let date = $("#attDate").val();
        if(!date) return alert("Select a date!");

        let s = students[selected];

        if(s.attendance[date]) 
            return alert("Already marked for this date!");

        s.attendance[date] = type;
        alert("Marked as " + type);

        loadAttendance();
    }

    $("#markPresent").click(()=> mark("Present"));
    $("#markAbsent").click(()=> mark("Absent"));


    // ======================
    // ADD NEW STUDENT
    // ======================
    $("#addStudentForm").submit(function(e){
        e.preventDefault();

        students.push({
            firstName: $("#fName").val(),
            lastName: $("#lName").val(),
            className: $("#clsName").val(),
            rollNo: $("#rollNo").val(),
            attendance: {}
        });

        alert("Student Added Successfully!");

        $("#addStudentModal").modal("hide");
        this.reset();
        loadStudents();
    });

});
