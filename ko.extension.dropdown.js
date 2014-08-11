var DDdata = function (id, photo, title) {
    var self = this;
    self.id = ko.observable(id);
    self.photo = ko.observable(photo);
    self.title = ko.observable(title);
}

var DDmodel = function () {
    var self = this;
    self.title = ko.observable();
    self.datas = ko.observableArray([]);
    self.selectedid = ko.observable();
    self.callback = null;
    self.reset = ko.observable(false);
    self.adddata = function (data) {
        self.datas.push(data);
    };
};

ko.bindingHandlers.Dropdown = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        $(element).addClass("ko-dd");
        var self = element;
        var records = ko.utils.unwrapObservable(valueAccessor());
        var template = "<div class='select selectcontainer' >";
        template += "<label>" + viewModel.title + "</label>";
        template += "<label>" + (records.length==0?"not available":"") + "</label>";
        template += "</div>";
        template += "<div class='drop dropcontainer'>";
        for (var i = 0; i < records.length; i++) {
            template += "<ul class='item'>";
            template += "<li>";
            template += "<img class='crewphoto' src='" + records[i].photo() + "' />";
            template += "<label>" + records[i].title() + "</label>";
            template += "<input class='id' type='hidden' value='" + records[i].id() + "'>";
            template += "<input class='idx' type='hidden' value='" + i + "'>";
            template += "</li>";
            template += "</ul>";            
        }
        template += "</div>";
        $(template).appendTo(self);
        $(".select", self).click(function () {
            if (records.length > 0) {
                $(".drop", self).css("display", $(".drop", self).css("display") == "none" ? "block" : "none");
            }
        });
        $(self).on("click", "ul", function () {
            var id = $(".id", this).val();
            var idx = $(".idx", this).val();
            viewModel.selectedid(id);
            var temp = "<ul class='item'>";
            temp += "<li class='imgctr'>";
            temp += "<img class='crewphoto' src='" + records[idx].photo() + "'/>";
            temp += "</li>";
            temp += "<li class='labelctr'>";
            temp += "<label>" + records[idx].title() +"</label>";
            temp += "</li>";
            temp += "</ul>";
            $(".select", self).html(temp);
            $(".drop", self).css("display", "none");

            if(viewModel.callback!=null)viewModel.callback(id);
        });
        $(".drop", self).mouseleave(function () {
            $(this).css("display", "none");
        });
    },
    update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        var self = element;
        var records = ko.unwrap(valueAccessor());
        var temp = "";
        for (var i = 0; i < records.length; i++) {
            temp += "<ul style=\"clear:both;width:100%;\">";
            temp += "<li style=\"float:left;min-width:80px;height:80px;\">";
            temp += "<img class='crewphoto' src=\"" + records[i].photo() + "\"/>";
            temp += "</li>";
            temp += "<li style=\"float:left;min-width:100px;height:80px;\">";
            temp += "<label style=\"margin-top:20px;font-size:20px;\">" + records[i].title() + "</label>";
            temp += "<input class=\"id\" type=\"hidden\" value=\"" + records[i].id() + "\">";
            temp += "<input class=\"idx\" type=\"hidden\" value=\"" + i + "\">";
            temp += "</li>";
            temp += "</ul>";
        }
        
        if (viewModel.reset) {
            var t= "<h4>" + viewModel.title + "</h4>";
            t+= "<label>" + (records.length==0?"not available":"") + "</label>";
            t+= "</div>";
            $(".select", self).html(t);
        }
        $(".select h4", self).html(viewModel.title);
        $(".drop", self).html(temp);
    }
};
