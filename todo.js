$(document).ready(function(e) {
  $("#add-todo").button({ icons: { primary: "ui-icon-circle-plus" } });

  $("#add-todo")
    .button({
      icons: { primary: "ui-icon-circle-plus" }
    })
    .click(function() {
      $("#new-todo").dialog("open");
    });

  $("#new-todo").dialog({ modal: true, autoOpen: false });

  let index = 0;
  $("#new-todo").dialog({
    modal: true,
    autoOpen: false,
    buttons: {
      "Add task": function() {
        let taskName = $("#task").val();
        let userName = $("#username").val();
        if (taskName === "" || userName === "") {
          return false;
        }
        var taskHTML = '<li><span class="done">%</span>';
        taskHTML += '<span class="edit">+</span>';
        taskHTML += '<span class="delete">x</span>';
        taskHTML += '<span class="task"></span>';
        taskHTML += '<span class="id"></span>';
        taskHTML += '<span class="username"></span></li>';
        var $newTask = $(taskHTML);
        index += 1;
        $newTask.find(".id").text(index);
        $newTask.find(".task").text(taskName);
        $newTask.find(".username").text(userName);

        $newTask.hide();
        $("#todo-list").prepend($newTask);
        $newTask.show("clip", 250).effect("highlight", 1000);
        //reset task value to empty
        $("#task").val("");
        $("#username").val("");

        $(this).dialog("close");
      },
      Cancel: function() {
        $(this).dialog("close");
      }
    }
  });

  $("#edit-todo").dialog({ modal: true, autoOpen: false });
  $("#edit-todo").dialog({
    modal: true,
    autoOpen: false,
    buttons: {
      Confirm: function() {
        let newTaskName = $("#taskUpdate").val();
        let newUserName = $("#usernameUpdate").val();
        if (newTaskName === "" || newUserName === "") {
          return false;
        }

        let itemVal = $("#edit-todo").dialog("option", "itemVal");
        $(itemVal)
          .find(".task")
          .text(newTaskName);
        $(itemVal)
          .find(".username")
          .text(newUserName);

        $(this).dialog("close");
      },
      Cancel: function() {
        $(this).dialog("close");
      }
    }
  });

  $("#todo-list").on("click", ".done", function() {
    var $taskItem = $(this).parent("li");
    $taskItem.slideUp(250, function() {
      var $this = $(this);
      $this[0].childNodes[1].remove();
      $this.detach();
      $("#completed-list").prepend($this);
      $this.slideDown();
    });
  });

  $(".sortlist").sortable({
    connectWith: ".sortlist",
    cursor: "pointer",
    placeholder: "ui-state-highlight",
    cancel: ".delete,.done"
  });

  $(".sortlist").on("click", ".delete", function() {
    var item = $(this).parent("li");
    $("#confirm-delete").dialog("option", "itemVal", item);
    $("#confirm-delete").dialog("open");
  });

  $(".sortlist").on("click", ".edit", function() {
    var item = $(this).parent("li");
    $("#taskUpdate").val(item.find(".task")[0].innerHTML);
    $("#usernameUpdate").val(item.find(".username")[0].innerHTML);
    $("#edit-todo").dialog("option", "itemVal", item);
    $("#edit-todo").dialog("open");
  });

  $("#confirm-delete").dialog({ modal: true, autoOpen: false });
  $("#confirm-delete").dialog({
    modal: true,
    autoOpen: false,
    buttons: {
      Confirm: function() {
        let itemVal = $("#confirm-delete").dialog("option", "itemVal");
        $(itemVal).effect("puff", function() {
          $(itemVal).remove();
        });

        $(this).dialog("close");
      },
      Cancel: function() {
        $(this).dialog("close");
      }
    }
  });
}); // end ready
