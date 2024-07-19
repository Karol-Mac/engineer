package com.example.engineer.util.mappers;

import com.example.engineer.entity.Seller;
import com.example.engineer.entity.User;
import com.example.engineer.payload.AccountDto;
import org.springframework.stereotype.Component;

@Component
public class AccountMapper {



    public AccountDto mapToDto(User user){
        AccountDto accountDto = new AccountDto();

        accountDto.setId(user.getId());
        accountDto.setUsername(user.getRealUsername());
        accountDto.setEmail(user.getEmail());
        accountDto.setIsBlocked(user.getIsBlocked());
        accountDto.setIsDeleted(user.getIsDeleted());
        //only role name, not ROLE_NAME
        accountDto.setRole(user.getRole().getName().substring(5));
        accountDto.setReportsCount(user.getReports().size());
        accountDto.setCommentsCount(user.getComments().size());

        //FIXME: ???
        var reportedCommentsCount = user.getReports().stream()
                .filter(report -> report.getComment() != null).count();
        var reportedProductsCount = user.getReports().stream()
                .filter(report -> report.getProduct() != null).count();


        accountDto.setReportedCommentsCount(reportedCommentsCount);
        accountDto.setReportedProductsCount(reportedProductsCount);
        accountDto.setAddedProductsCount(0);

        return accountDto;
    }

    public AccountDto mapToDto(Seller seller){
        AccountDto accountDto = new AccountDto();

        accountDto.setId(seller.getId());
        accountDto.setUsername(seller.getShopName());
        accountDto.setEmail(seller.getEmail());
        accountDto.setIsBlocked(false);
        accountDto.setIsDeleted(seller.getIsDeleted());
        //only role name, not ROLE_NAME
        accountDto.setRole(seller.getRole().getName().substring(5));

        accountDto.setReportsCount(0);
        accountDto.setCommentsCount(0);
        accountDto.setReportedCommentsCount(0);
        accountDto.setReportedProductsCount(0);

        accountDto.setAddedProductsCount(seller.getProducts().size());

        return accountDto;
    }
}
