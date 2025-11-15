// =======================
// Loader Animation
// =======================
$(window).on("load", function () {
    $("#introLoader").fadeOut(500);
});


// =======================
// Search Filter
// =======================
$("#search_box").on("keyup", function () {
    let value = $(this).val().toLowerCase();

    $("#studentTable tbody tr").filter(function () {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    });
});


// =======================
// Full Info Modal (Works for Dynamic Rows Too)
// =======================
$(document).on("click", ".full-info-btn", function () {

    $("#modalFirstname").text($(this).data("firstname"));
    $("#modalLastname").text($(this).data("lastname"));
    $("#modalFather").text($(this).data("father"));
    $("#modalMother").text($(this).data("mother"));
    $("#modalDob").text($(this).data("dob"));
    $("#modalBirthCert").text($(this).data("birthcert"));
    $("#modalNationality").text($(this).data("nationality"));
    $("#modalNid").text($(this).data("nid"));
    $("#modalBlood").text($(this).data("blood"));
    $("#modalReligion").text($(this).data("religion"));
});


// =======================
// Add New Student
// =======================
$("#addStudentForm").on("submit", function (e) {
    e.preventDefault();

    let currentId = $("#studentTable tbody tr").length + 1;

    let firstname   = $("#firstName").val();
    let lastname    = $("#lastName").val();

    let father      = $("#fatherName").val();
    let mother      = $("#motherName").val();
    let dob         = $("#dob").val();
    let birthCert   = $("#birthCert").val();
    let nationality = $("#nationality").val();
    let nid         = $("#nid").val();
    let blood       = $("#bloodGroup").val();
    let religion    = $("#religion").val();

    let fullName = firstname + " " + lastname;

    let newRow = `
        <tr>
            <td>${currentId}</td>
            <td>${fullName}</td>
            <td>10</td>
            <td>${currentId.toString().padStart(3, "0")}</td>
            <td>
              <button class="btn btn-gradient btn-sm full-info-btn"
                data-firstname="${firstname}"
                data-lastname="${lastname}"
                data-father="${father}"
                data-mother="${mother}"
                data-dob="${dob}"
                data-birthcert="${birthCert}"
                data-nationality="${nationality}"
                data-nid="${nid}"
                data-blood="${blood}"
                data-religion="${religion}"
                data-bs-toggle="modal" data-bs-target="#fullInfoModal">
                Full Info
              </button>
            </td>
        </tr>
    `;

    $("#studentTable tbody").append(newRow);

    $("#addStudentModal").modal("hide");
    this.reset();
});
