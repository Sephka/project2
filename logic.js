
// var distilleryLocations = new L.LayerGroup(); 

d3.csv("data/Distillery.csv").then(function(distilleryData) {
    
}); 

var GlobeOpt = function() {
    this.lon0 = 20;
    this.lat0 = 35;
    this.lat1 = 30;
    this.lat2 = 50;
    this.dist = 2;
    this.up = 0;
    this.tilt = 0;
    this.proj = 'ortho';
    this.projstr = '+proj=lcc +lat_1=44.1 +lat_0=44.1 +lon_0=0 +k_0=0.999877499 +x_0=600000 +y_0=200000 +a=6378249.2 +b=6356515 +towgs84=-168,-60,320,0,0,0,0 +pm=paris +units=m',
    //this.flip = 0;
    this.offsetx = 0;
    this.offsety = 0;
    this.startx = 0;
    this.starty = 0;
    this.deltalon = 0;
    this.deltalat = 0;
    this.isdragged = false;
    this.firstclick = true;
};
var globeopt = new GlobeOpt();
var url = location.href.split('#');
if (url.length>1) globeopt.proj = url[1];
$(function() {
    var P,
    createCanvas = function(id,w,h) {
        if (document.getElementById(id) != null) {
            var ctx = document.getElementById(id).getContext("2d");
            ctx.clearRect(0,0,w,h+20);
            return ctx;
        }
        var canvas = document.createElement("canvas");
        canvas.setAttribute("id", id);
        canvas.setAttribute("width", w+"px");
        canvas.setAttribute("height", h+"px");
        $('#map-parent').append(canvas);
        var ctx = canvas.getContext("2d");
        return ctx;
    },
    showMap = function(p, coastlines) {
        P = new kartograph.proj[p](globeopt);
        xy = P.project(13,14);
        if (isNaN(xy[0]) || isNaN(xy[1])) {
            console.error(p, P, xy);
            return;
        };
        var
        lon, lat, i,
        w = $('#map-parent').width(),
        h = 600,
        grat = 15,
        sea = P.sea(),
        bbox = P.world_bbox(),
        view,
        ctx = createCanvas("proj", w,h+20),
        len = ctx.measureText(p.toUpperCase()).width;
        ctx.beginPath();
        ctx.fillStyle ="#fff";
        view = new kartograph.View(bbox, w, h, 10);
        for (i=0;i<sea.length;i++) {
            xy = view.project(sea[i]);
            if (i==0) ctx.moveTo(xy[0], xy[1]);
            else ctx.lineTo(xy[0], xy[1]);
        }
        ctx.stroke();
        ctx.fill();
        ctx.lineWidth = 0.2;
        ctx.beginPath();
        // graticule
        for (lat=0;lat<90;lat+=grat) {
            var lats = lat == 0 ? [0] : [lat,-lat];
            for (var l in lats) {
                var lat_ = lats[l];
                var line = [];
                for (lon=-180;lon<180;lon++) {
                    line.push([lon,lat_]);
                }
                for (var i=0;i<line.length-1;i++) {
                    p0 = line[i];
                    p1 = line[i+1];
                    d = P.clon ? Math.abs(P.clon(p0[0])-P.clon(p1[0])) : 0;
                    if (P._visible(p0[0],p0[1]) && P._visible(p1[0],p1[1]) && d < 30) {
                        p0 = view.project(P.project(p0[0],p0[1]));
                        p1 = view.project(P.project(p1[0],p1[1]));
                        ctx.moveTo(p0[0],p0[1]);
                        ctx.lineTo(p1[0],p1[1]);
                    }
                }
            }
        }
        // graticule
        for (lon=0;lon<181;lon+=grat) {
            var lons = lon == 0 || lon == 180 ? [lon] : [lon,-lon];
            $.each(lons, function(l, lon_) {
                var line = [];
                for (lat=-90+(lon % 90 == 0 ? 0 : grat);lat<90-(lon%90 == 0 ? 0 : grat)+1;lat+=0.25) {
                    line.push([lon_,lat]);
                }
                for (var i=0;i<line.length-1;i++) {
                    p0 = line[i];
                    p1 = line[i+1];
                    d = P.clon ? Math.abs(P.clon(p0[0])-P.clon(p1[0])) : 0;
                    if (P._visible(p0[0],p0[1]) && P._visible(p1[0],p1[1]) && d < 100) {
                        p0 = view.project(P.project(p0[0],p0[1]));
                        p1 = view.project(P.project(p1[0],p1[1]));
                        ctx.moveTo(p0[0],p0[1]);
                        ctx.lineTo(p1[0],p1[1]);
                    }
                }
            });
        }
        ctx.stroke();
        ctx.lineWidth = 1;
        ctx.beginPath();
        var cl,line,p0,p1,d;
        for (cl=0; cl<coastlines.length; cl++) {
            line = coastlines[cl];
            for (i=0;i<line.length-1;i++) {
                p0 = line[i];
                p1 = line[i+1];
                d = P.clon ? Math.abs(P.clon(p0[0])-P.clon(p1[0])) : 0;
                if (P._visible(p0[0],p0[1]) && P._visible(p1[0],p1[1]) && d < 100) {
                    p0 = view.project(P.project(p0[0],p0[1]));
                    p1 = view.project(P.project(p1[0],p1[1]));
                    ctx.moveTo(p0[0],p0[1]);
                    ctx.lineTo(p1[0],p1[1]);
                }
            }
        }
        ctx.stroke();
    },
    frame = 0,
    renderFrame = function() {
        showMap(globeopt.proj, coastlines);
        // Iterate over all controllers
    };
    $.getJSON('https://github.com/kartograph/kartograph.org/blob/master/showcase/projections/coastline.json', function(coastlines) {
            window.coastlines = coastlines;
            renderFrame();
    });
    window.gui = new dat.GUI({ 
        autoPlace: false,
        width: 330,
        hideable: false,
        resizable: false
    });
    $('.k-gui').append(gui.domElement);
    gui.remember(globeopt);
    var proj = [];
    $.each(kartograph.proj, function(p) {
        proj.push(p);
    })
    proj = proj.sort();
    window.projopts = {
        lon0: [-180,180, 1],
        lat0: [-90, 90],
        lat1: [-90, 90],
        lat2: [-90, 90],
        dist: [1.01, 10, 0.01],
        up: [-180,180],
        tilt: [-40,0],
        projstr: 'str'
    };
    var updateGUI = function() {
        // reset gui
        try {
            for (var i=gui.__controllers.length-1; i>=0; i--) {
                gui.remove(gui.__controllers[i]);
            }
        } catch (e) {}
        gui.add(globeopt, 'proj', proj).onChange(function() {
            updateGUI();
            renderFrame();
        });
        $.each(projopts, function(key, val) {
            if (kartograph.proj[globeopt.proj].parameters.indexOf(key) >= 0) {
                var s = val == 'str' ? gui.add(globeopt, key) : gui.add(globeopt, key, val[0], val[1]);
                if (val != 'str' && val.length == 3) s.step(val[2]);
                s.onChange(renderFrame);
            }
        });
        $('#k-proj-title').html(kartograph.proj[globeopt.proj].title);
        var url = location.href.split('#');
        location.href = url[0]+'#'+globeopt.proj;
    };
    updateGUI();
    $('#map-parent').click(function (e) {
        globeopt.startx = e.pageX - this.offsetLeft;
        globeopt.starty = e.pageY - this.offsetTop;
    });
    $('#map-parent').mousedown(function (e) {
        globeopt.isdragged = true;
    });
    $('#map-parent').mouseup(function (e) {
        globeopt.isdragged = false;
        globeopt.firstclick = true;
        $('#status2').html((e.pageX - globeopt.offsetx - globeopt.startx) + ', ' + (e.pageY - globeopt.offsety - globeopt.starty));
    });
    var latstart = 0,
        lonstart = 0,
        lastlat = 0,
        lastlon = 0;
    $('#map-parent').mousemove(function (e) {
        globeopt.offsetx = this.offsetLeft;
        globeopt.offsety = this.offsetTop;
        $('#status').html(e.pageX + ', ' + e.pageY);
        if (globeopt.isdragged === true) {
            lastlat = globeopt.lat0;
            lastlon = globeopt.lon0;
            if (globeopt.firstclick === true) {
                globeopt.startx = e.pageX - globeopt.offsetx;
                globeopt.starty = e.pageY - globeopt.offsety;
                latstart = globeopt.lat0;
                lonstart = globeopt.lon0;
                globeopt.firstclick = false;
            }
            var relx = e.pageX - globeopt.offsetx - globeopt.startx;
            var rely = e.pageY - globeopt.offsety - globeopt.starty;
            //$('#status').html(relx +', '+ rely);
            globeopt.deltalon = (-relx / 4);
            globeopt.deltalat = (rely / 4);
            globeopt.lon0 = (lonstart + globeopt.deltalon + 540) % 360 - 180;
            globeopt.lat0 = latstart + globeopt.deltalat;
            if (globeopt.lat0 > 90) {globeopt.lat0 = 90; }
            if (globeopt.lat0 < -90) {globeopt.lat0 = -90; }
            gui.__controllers[1].updateDisplay();
            gui.__controllers[2].updateDisplay();
            //$('#relxystatus').html(globeopt.deltalat +'Â°'+ globeopt.deltalon + 'Â°');
            $('#latlonstatus').html((Math.floor(globeopt.lat0)) + 'Â°, ' + (Math.floor(globeopt.lon0)) + 'Â°');
            if (globeopt.lat0 !== lastlat || globeopt.lon0 !== lastlon) {
                renderFrame();
            }
        }
    });
});
