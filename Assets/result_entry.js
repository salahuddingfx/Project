$(function(){

    // DEFAULT STUDENT LIST
    let students = [
        {first:"Salah Uddin", last:"Kader", class:"10", roll:"001", result:{}},
        {first:"Partha Protim", last:"Datta", class:"10", roll:"002", result:{}},
        {first:"Rafi Bin", last:"Nur", class:"10", roll:"003", result:{}}
    ];

    let selected = null;


    // LOAD STUDENTS IN SIDEBAR
    function loadStudents(filter="") {
        filter = filter.toLowerCase();
        $("#studentCards").empty();

        students.forEach((s, i)=>{
            let full = (s.first+" "+s.last).toLowerCase();

            if(full.includes(filter) || s.class.includes(filter) || s.roll.includes(filter)){
                $("#studentCards").append(`
                    <div class="list-group-item student-item" data-id="${i}">
                        ${s.first} ${s.last}
                        <br><small>Class ${s.class} | Roll ${s.roll}</small>
                    </div>
                `);
            }
        });
    }
    loadStudents();


    // SEARCH
    $("#searchStudent").keyup(function(){
        loadStudents($(this).val());
    });


    // SELECT STUDENT
    $(document).on("click",".student-item",function(){

        $(".student-item").removeClass("active");
        $(this).addClass("active");

        selected = $(this).data("id");
        
        let s = students[selected];
        $("#selectedStudentName").text(s.first+" "+s.last);
    });


    // AUTO CALCULATE FUNCTION
    $(".markBox").on("input", function(){

        let ban = Number($("#sub_ban").val());
        let eng = Number($("#sub_eng").val());
        let math = Number($("#sub_math").val());
        let sci = Number($("#sub_sci").val());
        let ict = Number($("#sub_ict").val());
        let rel = Number($("#sub_rel").val());
        let ssc = Number($("#sub_ssc").val());

        let total = ban+eng+math+sci+ict+rel+ssc;
        $("#totalMarks").text(total);

        // GPA
        let gpa = (total / 7) / 20;
        if(gpa > 5) gpa = 5;

        $("#gpaValue").text(gpa.toFixed(2));

        // Grade
        let grade = "F";
        if(gpa == 5) grade = "A+";
        else if(gpa >= 4) grade = "A";
        else if(gpa >= 3.5) grade = "A-";
        else if(gpa >= 3) grade = "B";
        else if(gpa >= 2) grade = "C";
        else if(gpa >= 1) grade = "D";

        $("#gradeValue").text(grade);
    });


    // SAVE RESULT
    $("#saveResult").click(function(){
        if(selected === null) return alert("Select a Student");

        let s = students[selected];

        s.result = {
            ban: $("#sub_ban").val(),
            eng: $("#sub_eng").val(),
            math: $("#sub_math").val(),
            sci: $("#sub_sci").val(),
            ict: $("#sub_ict").val(),
            rel: $("#sub_rel").val(),
            ssc: $("#sub_ssc").val(),
            total: $("#totalMarks").text(),
            gpa: $("#gpaValue").text(),
            grade: $("#gradeValue").text()
        };

        alert("Result Saved Successfully!");
    });


    // ADD NEW STUDENT
    $("#addStudentForm").submit(function(e){
        e.preventDefault();

        students.push({
            first: $("#fName").val(),
            last: $("#lName").val(),
            class: $("#clsName").val(),
            roll: $("#rollNo").val(),
            result: {}
        });

        alert("Student Added!");

        $("#addStudentModal").modal("hide");
        loadStudents();
        this.reset();
    });

});

