const Datatable = (req, res) =>{
    if (!_.isEmpty(req.query)) {
        const { pageSum, pageNumber, namaSubkategori } = req.query;
        pN = parseInt(pageNumber);
        pS = parseInt(pageSum);
        nama = namaSubkategori;
      }
      const totalPage =
        (await Subkategori.find({
          namaSubkategori: new RegExp(".*" + nama + ".*", "i"),
        }).count()) / pS;
      const subkategori = await Subkategori.find({
        namaSubkategori: new RegExp(".*" + nama + ".*", "i"),
      })
        .skip((pN - 1) * pS)
        .limit(pS)
        .sort('namaSubkategori')
        .populate('kategori')
    
      let newArr = [];
      subkategori.forEach(item => {
        const final = {id:'', namaSubkategori:'', namaKategori:''}
        final.id = item._id;
        final.namaSubkategori = item.namaSubkategori;
        final.namaKategori = item.kategori.namaKategori;
        newArr.push(final)
      })
      if(subkategori.length !== 0){
        const rest = {
          newArr,
          totalPage,
        };
        res.json(rest);
        return
      }
      res.json();
}

module.exports = Datatable;