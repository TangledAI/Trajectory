package com.zennture.TangledAI;

import com.zennture.TangledAI.VO.TangledVO;
import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;


@RestController
@CrossOrigin("*")
public class TangledController {

    @Autowired
    private TangledService tangledService;
    private Logger logger = (Logger) LoggerFactory.getLogger(TangledController.class);

    @RequestMapping(value="/doFeedBackSubmit",method = {RequestMethod.POST,RequestMethod.GET})
    public void doFeedBackSubmit(@RequestBody TangledVO tangledVO){
        try {
            tangledService.feedBackAddService(tangledVO);
        } catch (IOException e) {
            e.printStackTrace();
            logger.error(e.getMessage());
        } catch (InvalidFormatException e) {
            e.printStackTrace();
            logger.error(e.getMessage());
        }
    }
}
