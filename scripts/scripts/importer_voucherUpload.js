var body = {
	filePath: $event.path,
	fileNamePattern: $event.fileName
};

var FileName = $event.fileName.replace(/([^a-zA-Z0-9])/g, "_");
$self.properties().put(FileName,{voucherId: $event.voucherId});


$integration.sftp("voucherSftp", body);
