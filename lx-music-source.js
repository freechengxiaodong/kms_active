"use strict";
    const {EVENT_NAMES: e, on: r, send: t, request: n, utils: o, version: s, currentScriptInfo: i} = globalThis.lx,
        a = {
            buffer: {from: o.buffer.from, bufToString: o.buffer.bufToString},
            crypto: {
                aesEncrypt: o.crypto.aesEncrypt,
                md5: o.crypto.md5,
                randomBytes: o.crypto.randomBytes,
                rsaEncrypt: o.crypto.rsaEncrypt
            }
        };
    i ? i.rawScript : document.getElementsByTagName("script")[0].innerText;
    const c = {"128k": "128kmp3", "320k": "320kmp3", flac: "2000kflac", flac24bit: "4000kflac"},
        l = e => a.crypto.md5(e);
    var d, u, A, p;
    d = e => ("" + e).replace(/[^\d.]+/g, e => "." + (e.replace(/[\W_]+/, "").toUpperCase().charCodeAt(0) - 65536) + ".").replace(/(?:\.0+)*(\.-\d+(?:\.\d+)?)\.*$/g, "$1").split(".");

    function m(t, o = "") {
        const s = Object.keys(t).sort();
        let i = "";
        return s.forEach((e, r) => {
            i += e + "=" + t[e], r != s.length - 1 && (i += o)
        }), i
    }

    const E = {
        "128k": {s: "M500", e: ".mp3", bitrate: "128kbps"},
        "320k": {s: "M800", e: ".mp3", bitrate: "320kbps"},
        flac: {s: "F000", e: ".flac", bitrate: "FLAC"}
    }, f = {"128k": "standard", "320k": "exhigh", flac: "lossless", flac24bit: "hires"}, D = (e, r) => {
        var t, r = "object" == typeof r ? JSON.stringify(r) : r, o = `nobody${e}use${r}md5forencrypt`, o = l(o);
        return {params: (e = e + `-36cd479b6b5-${r}-36cd479b6b5-` + o, r = "e82ckenh8dichen8", o = "", t = "aes-128-ecb", s || (t = t.split("-").pop()), e = a.crypto.aesEncrypt(e, t, r, o), (s ? a.buffer.bufToString(e, "hex") : [...new Uint8Array(e)].map(e => e.toString(16).padStart(2, "0")).join("")).toUpperCase())}
    }, y = {"128k": "PQ", "320k": "HQ", flac: "SQ", flac24bit: "ZQ"}, B = {
        kw: {
            info: {
                name: "酷我音乐",
                type: "music",
                actions: ["musicUrl"],
                qualitys: ["128k", "320k", "flac", "flac24bit"]
            }, async musicUrl({songmid: e}, r) {
                const s = `https://nmobi.kuwo.cn/mobi.s?br=4000kflac&f=web&source=kwplayer_ar_1.1.9_oppo_118980_320.apk&type=convert_url_with_sign&rid=${e}&br=` + (r = c[r]);
                return new Promise((t, o) => {
                    n(s, {
                        method: "GET",
                        headers: {"User-Agent": "okhttp/4.10.0"}
                    }, (e, r) => (console.log(r.body), e ? o(e) : 200 != r.body.code || 0 == r.body.data.bitrate ? o(new Error("failed")) : void t(r.body.data.url.split("?")[0])))
                })
            }
        },
        kg: {
            info: {name: "酷狗音乐", type: "music", actions: ["musicUrl"], qualitys: ["128k"]},
            musicUrl({hash: s, albumId: i}, a) {
                return new Promise((t, o) => {
                    console.log(s, a);
                    var e = l(s + "57ae12eb6890223e355ccfcb74edf70d10051234560"), e = {
                            album_id: i,
                            userid: 0,
                            area_code: 1,
                            hash: s,
                            module: "",
                            mid: 123456,
                            appid: "1005",
                            ssa_flag: "is_fromtrack",
                            clientver: "10086",
                            vipType: 6,
                            ptype: 0,
                            token: "",
                            auth: "",
                            mtype: 0,
                            album_audio_id: 0,
                            behavior: "play",
                            clienttime: Math.floor(Date.now() / 1e3),
                            pid: 2,
                            key: e,
                            dfid: "-",
                            pidversion: 3001,
                            quality: "128"
                        }, r = l("OIlwieks28dk2k092lksi2UIkp" + m(e) + "OIlwieks28dk2k092lksi2UIkp"),
                        e = "https://gateway.kugou.com/v5/url?" + m(e, "&") + "&signature=" + r;
                    n(e, {
                        method: "GET",
                        headers: {
                            "User-Agent": "Android712-AndroidPhone-8983-18-0-NetMusic-wifi",
                            "KG-THash": "3e5ec6b",
                            "KG-Rec": "1",
                            "KG-RC": "1",
                            "x-router": "tracker.kugou.com"
                        }
                    }, (e, r) => {
                        return console.log(r), e ? o(e) : 1 !== (e = r.body).status ? o(new Error(e.err_code)) : void t(r.body.url[0])
                    })
                })
            }
        };
