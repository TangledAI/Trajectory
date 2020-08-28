package com.zennture.TangledAI;

import com.zennture.TangledAI.VO.TangledVO;
import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;

@Service
public class TangledService {

    public void feedBackAddService(TangledVO tangledVO) throws IOException, InvalidFormatException {
        File file = new File("/Users/prabhurajendran/Documents/test.xlsx");
        if(!file.exists()){
            file.createNewFile();
            isNewFileCreation(tangledVO,file);
        }else{
            updateFileData(tangledVO,file);
        }

    }

    private void updateFileData(TangledVO tangledVO, File file) throws IOException, InvalidFormatException{
        FileInputStream fileIn = new FileInputStream(file);
        XSSFWorkbook workbook = new XSSFWorkbook(fileIn);
        if(null == workbook)
            return;
        Sheet sheet = workbook.getSheet("FeedSheet");
        if(null == sheet){
            sheet = workbook.createSheet("FeedSheet");
            doHeaderCreation(sheet);
        }
        doDataInseration(sheet,tangledVO);
        fileIn.close();
        FileOutputStream fileOut = new FileOutputStream(file);
        workbook.write(fileOut);
        fileOut.close();
    }

    private void isNewFileCreation(TangledVO tangledVO, File file) throws IOException, InvalidFormatException {
        XSSFWorkbook workbook = new XSSFWorkbook();
        if(null == workbook)
            return;
        Sheet sheet = workbook.getSheet("FeedSheet");
        if(null == sheet){
            sheet = workbook.createSheet("FeedSheet");
            doHeaderCreation(sheet);
        }
        doDataInseration(sheet,tangledVO);
        FileOutputStream fileOut = new FileOutputStream(file);
        workbook.write(fileOut);
        fileOut.close();
    }

    private void doDataInseration(Sheet sheet,TangledVO tangledVO){
        int lastrow = sheet.getLastRowNum();
        //int lastrow = 2;
                System.out.println("Current Row: "+lastrow);
        Row row = sheet.createRow(lastrow+1);
        Cell cellName = row.createCell(0);
        cellName.setCellValue(tangledVO.getProductName());
        Cell cellEmail = row.createCell(1);
        cellEmail.setCellValue(tangledVO.getEmail());
        Cell cellService = row.createCell(2);
        cellService.setCellValue(tangledVO.getServiceLocation());
        Cell cellDesc = row.createCell(3);
        cellDesc.setCellValue(tangledVO.getProdDesc());
    }

    private void doHeaderCreation(Sheet sheet){
        Row row = sheet.createRow(0);
        Cell cellName = row.createCell(0);
        cellName.setCellValue("Name");
        Cell cellEmail = row.createCell(1);
        cellEmail.setCellValue("Email");
        Cell cellService = row.createCell(2);
        cellService.setCellValue("Service");
        Cell cellObj = row.createCell(3);
        cellObj.setCellValue("Product Desc");
    }
}
